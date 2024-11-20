package group5.swp.HarasyProject.service.impl;


import group5.swp.HarasyProject.dto.request.order.CustomerOrderRequest;
import group5.swp.HarasyProject.dto.request.order.OrderItemRequest;
import group5.swp.HarasyProject.dto.request.order.OrderRequest;
import group5.swp.HarasyProject.dto.request.reservation.CheckReserveTimeRequest;
import group5.swp.HarasyProject.dto.request.reservation.CustomerReserveRequest;
import group5.swp.HarasyProject.dto.request.reservation.ReservationRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.order.OrderResponse;
import group5.swp.HarasyProject.dto.response.reservation.AvailableReserveTimeResponse;
import group5.swp.HarasyProject.dto.response.reservation.ReservationResponse;
import group5.swp.HarasyProject.entity.account.CustomerAccountEntity;
import group5.swp.HarasyProject.entity.account.StaffAccountEntity;
import group5.swp.HarasyProject.entity.branch.BranchEntity;
import group5.swp.HarasyProject.entity.branch.BranchWorkingHourEntity;
import group5.swp.HarasyProject.entity.branch.TableEntity;
import group5.swp.HarasyProject.entity.order.OrderEntity;
import group5.swp.HarasyProject.entity.order.OrderItemEntity;
import group5.swp.HarasyProject.entity.order.OrderItemId;
import group5.swp.HarasyProject.entity.reservation.ReservationEntity;
import group5.swp.HarasyProject.entity.reservation.ReservationTypeEntity;
import group5.swp.HarasyProject.enums.OrderItemStatus;
import group5.swp.HarasyProject.enums.PaymentStatus;
import group5.swp.HarasyProject.enums.ReservationStatus;
import group5.swp.HarasyProject.enums.ReservationType;
import group5.swp.HarasyProject.exception.AppException;
import group5.swp.HarasyProject.exception.ErrorCode;
import group5.swp.HarasyProject.service.*;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@RequiredArgsConstructor
public class BusinessManagementServiceImpl implements BusinessManagementService {

    BranchService branchService;
    TableService tableService;
    AccountService accountService;
    FoodService foodService;
    OrderService orderService;
    OrderItemService orderItemService;
    ReservationService reservationService;
    ReservationTypeService reservationTypeService;


    @Override
    public ApiResponse<Page<OrderResponse>> getAllOrders(Pageable pageable) {
        Page<OrderEntity> orders = orderService.getAllOrders(pageable);
        return ApiResponse.<Page<OrderResponse>>builder()
                .data(orders.map(orderService::toResponse))
                .build();
    }

    @Override
    public ApiResponse<List<OrderResponse>> getAllInTimeOrders(int branchId) {
        return ApiResponse.<List<OrderResponse>>builder()
                .data(orderService.getBranchOrdersInTime(branchId)
                        .stream().map(orderService::toResponse)
                        .toList())
                .build();
    }


    @Override
    public ApiResponse<Page<OrderResponse>> getAllCusOrders(Pageable pageable, int customerId) {
        Page<OrderEntity> orders = orderService.getOrdersByCustomerId(customerId, pageable);
        return ApiResponse.<Page<OrderResponse>>builder()
                .data(orders.map(orderService::toResponse))
                .build();
    }


    @Override
    public ApiResponse<Page<ReservationResponse>> getAllCusReservations(Pageable pageable, int customerId) {
        Page<ReservationEntity> reserves = reservationService.getAllCusReservations(pageable, customerId);
        return ApiResponse.<Page<ReservationResponse>>builder()
                .data(reserves.map(reservationService::toReservationResponse))
                .build();
    }

    @Override
    public ApiResponse<OrderResponse> getOrder(int orderId) {
        return ApiResponse.<OrderResponse>builder()
                .data(toOrderResponse(orderId))
                .build();
    }

    @Override
    public ApiResponse<OrderResponse> createOrder(OrderRequest orderRequest) {
        OrderEntity order = buildOrderWithType(orderRequest, ReservationType.GENERAL);
        return ApiResponse.<OrderResponse>builder()
                .data(toOrderResponse(order.getId()))
                .build();
    }

    private OrderEntity buildGeneralOrder(OrderRequest orderRequest) {
        BranchEntity branch = branchService.getBranchEntity(orderRequest.getBranchId());
        List<Integer> tableIds = orderRequest.getTableIds()
                .stream().filter(branch::isTableInBranch)
                .toList();
        if (tableIds.isEmpty()) throw new AppException(ErrorCode.ORDER_HAVE_NO_TABLE);
        List<TableEntity> tables = tableService.getTables(tableIds)
                .stream().map(TableEntity::order)
                .toList();
        StaffAccountEntity staff = accountService.getStaffAccount(orderRequest.getStaffId());
        CustomerAccountEntity customer = getCustomerAccount(orderRequest.getCustomer());
        OrderEntity order = OrderEntity.builder()
                .staff(staff)
                .tables(tables)
                .customer(customer)
                .branch(branch)
                .note(orderRequest.getNote() != null ? orderRequest.getNote() : "")
                .paymentStatus(PaymentStatus.PENDING)
                .build();
        order.setOrderItems(createOrderItem(orderRequest, order));
        return orderService.save(order.calculateTotal());
    }

    private OrderEntity buildWeddingOrder(OrderRequest orderRequest) {
        return null;
    }


    @Override
    @Transactional
    public ApiResponse<OrderResponse> updateOrder(int orderId, OrderRequest request) {
        OrderEntity order = orderService.getOrderById(orderId);
        if (order.getPaymentStatus().equals(PaymentStatus.PAYED))
            throw new AppException(ErrorCode.ORDER_WAS_CLOSED);
        updateOrderItemInOrder(request, order);
        createOrderItem(request, order);
        if (request.getNote() != null) order.setNote(request.getNote());
        if (request.getPaymentStatus() != null) {
            if (order.getPaymentStatus().equals(PaymentStatus.PAYED)) {
                if (!order.isCookedAll()) throw new AppException(ErrorCode.ORDER_NOT_DONE_YET);
            }
            order.setPaymentStatus(request.getPaymentStatus());
        }
        if (order.getPaymentStatus().equals(PaymentStatus.PAYED)) order.payOrder();
        orderService.save(order.calculateTotal());
        return ApiResponse.<OrderResponse>builder()
                .data(toOrderResponse(order.getId()))
                .build();
    }

    private List<OrderItemEntity> createOrderItem(OrderRequest request, OrderEntity order) {
        if (request.getOrderItems() != null) {
            if (request.getOrderItems().getCreates() != null) {
                return toOrderItems(request.getOrderItems().getCreates(), order);
            }
        }
        return null;
    }

    private void updateOrderItemInOrder(OrderRequest request, OrderEntity order) {
        if (request.getOrderItems() != null) {
            if (request.getOrderItems().getUpdates() != null) {
                for (OrderItemRequest orderItemRequest : request.getOrderItems().getUpdates()) {
                    OrderItemEntity item = orderItemService
                            .findByOrderIdAndFoodId(order.getId(), orderItemRequest.getFoodId());
                    if (!item.getStatus().equals(OrderItemStatus.PENDING)) {
                        if (orderItemRequest.getQuantity() != null) {
                            if (orderItemRequest.getQuantity() <= item.getQuantity()) continue;
                        }
                    }
                    item = orderItemService.mapUpdateOrderItem(orderItemRequest, item);
                    orderItemService.save(item.calculatePrice());
                }
            }
        }
    }

    @Override
    @Transactional
    public ApiResponse<ReservationResponse> customerReservation(CustomerReserveRequest request) {
        BranchEntity branch = branchService.getBranchEntity(request.getBranchId());
        CustomerAccountEntity customer = getCustomerAccount(request.getCustomer());
        List<TableEntity> tables = calculateCustomerReserveTable(request.getBranchId(), request.getDate()
                , request.getTime(), request.getAmountGuest());
        ReservationEntity reservation = ReservationEntity.builder()
                .amountGuest(request.getAmountGuest())
                .branch(branch)
                .customer(customer)
                .time(request.getTime())
                .date(request.getDate())
                .type(reservationTypeService
                        .getReservationTypeById(request.getTypeId()))
                .status(ReservationStatus.PENDING)
                .tables(tables)
                .order(OrderEntity.builder()
                        .tables(tables)
                        .paymentStatus(PaymentStatus.PENDING)
                        .customer(customer)
                        .branch(branch)
                        .build())
                .build();
        reservation = reservationService.saveReservation(reservation);
        return ApiResponse.<ReservationResponse>builder()
                .data(toReservationResponse(reservation.getId()))
                .build();
    }


    private List<TableEntity> calculateCustomerReserveTable(int branchId, LocalDate date,
                                                            LocalTime time, int amountGuest) {
        List<TableEntity> tables = tableService.getAllTablesAvailableToReserve(branchId, date, time);
        List<TableEntity> res = new ArrayList<>();
        int total = 0;
        for (TableEntity table : tables) {
            if (total >= amountGuest) break;
            total += table.getCapacity();
            res.add(table);
        }
        return res;
    }


    @Override
    public ApiResponse<AvailableReserveTimeResponse> getAvailableReserveTime(CheckReserveTimeRequest request) {
        BranchEntity branch = branchService.getBranchEntity(request.getBranchId());
        List<BranchWorkingHourEntity> workingHours = branch.getWorkingHours();
        if (!isValidReserveDate(request.getTime(), request.getDate(), workingHours))
            throw new AppException(ErrorCode.INVALID_RESERVE_DATE);
        LocalTime start = request.getTime().minusHours(2);
        LocalTime end = request.getTime().plusHours(2);
        List<LocalTime> timeSlots = generateReserveTime(start, end);
        String timeSlotsQuery = convertTimeToQuery(timeSlots);
        List<String> availableTimes = reservationService.getAvailableTime(request.getBranchId(), timeSlotsQuery
                , request.getDate(), request.getAmountGuest());
        return ApiResponse.<AvailableReserveTimeResponse>builder()
                .data(AvailableReserveTimeResponse.builder()
                        .availableReservations(availableTimes)
                        .build())
                .build();
    }


    @Override
    @Transactional
    public ApiResponse<ReservationResponse> createReservation(ReservationRequest request) {
        BranchEntity branch = branchService.getBranchEntity(request.getBranchId());
        CustomerAccountEntity customer = getCustomerAccount(request.getCustomer());
        List<TableEntity> tables = tableService.getTables(request.getTableIds());
        int totalCapacity = tables.stream()
                .map(TableEntity::getCapacity)
                .reduce(0, Integer::sum);
        if (totalCapacity < request.getAmountGuest())
            throw new AppException(ErrorCode.NOT_ENOUGH_TABLE_FOR_RESERVE);
        ReservationTypeEntity type = reservationTypeService
                .getReservationTypeById(request.getTypeId());
        OrderEntity order = buildOrderWithType(request.getOrder(), type.getName());
        ReservationEntity reservation = ReservationEntity.builder()
                .amountGuest(request.getAmountGuest())
                .branch(branch)
                .customer(customer)
                .time(request.getTime())
                .date(request.getDate())
                .type(type)
                .tables(tables)
                .status(ReservationStatus.APPROVED)
                .order(order)
                .build();
        reservation = reservationService.saveReservation(reservation.calculate());
        return ApiResponse.<ReservationResponse>builder()
                .data(toReservationResponse(reservation.getId()))
                .build();
    }


    @Override
    @Transactional
    public ApiResponse<ReservationResponse> updateReservation(ReservationRequest request, int id) {
        ReservationEntity reservation = reservationService.getReservationById(id);
        if (reservation.getStatus().equals(ReservationStatus.DONE))
            throw new AppException(ErrorCode.ORDER_WAS_CLOSED);
        if (request.getOrder() != null) updateOrder(reservation.getOrder().getId(), request.getOrder());
        if (request.getStatus() != null) reservation.setStatus(request.getStatus());
        if (request.getAmountGuest() != 0) reservation.setAmountGuest(request.getAmountGuest());
        reservation = reservationService.saveReservation(reservation);
        return ApiResponse.<ReservationResponse>builder()
                .data(toReservationResponse(reservation.getId()))
                .build();
    }

    @Override
    public ApiResponse<Page<ReservationResponse>> getAllReservationsInBranch(Pageable pageable,
                                                                             Boolean isHistory, int branchId) {
        return ApiResponse.<Page<ReservationResponse>>builder()
                .data(reservationService.getAllReservationsInBranch(pageable, isHistory, branchId).map(reservationService::toReservationResponse))
                .build();
    }


    @Override
    public ApiResponse<OrderResponse> deleteOrderItem(int orderId, int foodId) {
        orderItemService.deleteItem(orderId, foodId);
        return ApiResponse.<OrderResponse>builder()
                .data(toOrderResponse(orderId))
                .build();
    }

    @Override
    public ApiResponse<ReservationResponse> getReservation(int id) {
        return ApiResponse.<ReservationResponse>builder()
                .data(toReservationResponse(id))
                .build();
    }

    private OrderEntity buildOrderWithType(OrderRequest orderRequest, ReservationType type) {
        return switch (type) {
            case GENERAL -> buildGeneralOrder(orderRequest);
            case WEDDING -> buildWeddingOrder(orderRequest);
            default -> null;
        };
    }


    private List<LocalTime> generateReserveTime(LocalTime start, LocalTime end) {
        List<LocalTime> slots = new ArrayList<>();
        while (!start.isAfter(end)) {
            slots.add(start);
            start = start.plusMinutes(30);
        }
        return slots;
    }


    private String convertTimeToQuery(List<LocalTime> timeSlots) {
        List<String> query = new ArrayList<>(timeSlots.stream()
                .map(time -> String.format("SELECT '%s' ", time.toString()))
                .toList());
        query.set(0, query.getFirst() + "AS slot_time ");
        return String.join(" UNION ALL ", query);
    }


    private boolean isValidReserveDate(LocalTime reserveTime,
                                       LocalDate reserveDate, List<BranchWorkingHourEntity> workingHours) {
        boolean validDate = false;
        BranchWorkingHourEntity tmpHour = null;
        for (BranchWorkingHourEntity workingHour : workingHours) {
            DayOfWeek reserveDayOfWeek = reserveDate.getDayOfWeek();
            DayOfWeek workingDayOfWeek = workingHour.getDayOfWeek();
            if (reserveDayOfWeek.equals(workingDayOfWeek)) {
                validDate = true;
                tmpHour = workingHour;
                break;
            }
        }
        if (!validDate) return false;
        return (reserveTime.plusHours(2).isAfter(tmpHour.getOpeningTime())
                && reserveTime.minusHours(2).isBefore(tmpHour.getClosingTime()));
    }


    private CustomerAccountEntity getCustomerAccount(CustomerOrderRequest request) {
        int id;
        if (request.getCustomerId() != null) {
            id = request.getCustomerId();
        } else {
            id = accountService.quickCustomerRegis(request.getNewCustomer()).getData().getCustomerId();
        }
        return accountService.getCustomerAccount(id);
    }

    private List<OrderItemEntity> toOrderItems(List<OrderItemRequest> request, OrderEntity order) {
        return request
                .stream().map(item -> toOrderItem(item, order))
                .toList();
    }

    private OrderItemEntity toOrderItem(OrderItemRequest request, OrderEntity order) {
        OrderItemEntity item = OrderItemEntity.builder()
                .id(OrderItemId.builder()
                        .foodId(request.getFoodId())
                        .build())
                .quantity(request.getQuantity())
                .order(order)
                .food(foodService.getFoodEntity(request.getFoodId()))
                .status(OrderItemStatus.PENDING)
                .cooked(0)
                .build()
                .calculatePrice();
        order.addItem(item);
        return item;
    }

    private OrderResponse toOrderResponse(int orderId) {
        OrderEntity order = orderService.getOrderById(orderId);
        return orderService.toResponse(order.calculateTotal());
    }

    private ReservationResponse toReservationResponse(int reserveId) {
        ReservationEntity reserve = reservationService.getReservationById(reserveId);
        return reservationService.toReservationResponse(reserve);
    }

    @Override
    public Long getRevenueByDay(LocalDate specificDate) {
        return orderService.getRevenueByDay(specificDate);
    }

    @Override
    public List<Object[]> getDailyRevenueInMonth(int month, int year) {
        return orderService.getDailyRevenueInMonth(month, year);
    }

    @Override
    public Long getRevenueByMonth(int month, int year) {
        return orderService.getRevenueByMonth(month, year);
    }

    @Override
    public List<Object[]> getMonthlyRevenueInYear(int year) {
        return orderService.getMonthlyRevenueInYear(year);
    }

    @Override
    public Long getRevenueByYear(int year) {
        return orderService.getRevenueByYear(year);
    }

    @Override
    public List<Object[]> getTotalRevenueForAllYears() {
        return orderService.getTotalRevenueForAllYears();
    }
}
