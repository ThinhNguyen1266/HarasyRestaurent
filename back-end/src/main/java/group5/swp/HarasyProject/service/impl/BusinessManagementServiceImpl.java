package group5.swp.HarasyProject.service.impl;


import group5.swp.HarasyProject.dto.request.order.CustomerOrderRequest;
import group5.swp.HarasyProject.dto.request.order.OrderItemRequest;
import group5.swp.HarasyProject.dto.request.order.OrderRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.order.OrderResponse;
import group5.swp.HarasyProject.entity.account.CustomerAccountEntity;
import group5.swp.HarasyProject.entity.account.StaffAccountEntity;
import group5.swp.HarasyProject.entity.branch.BranchEntity;
import group5.swp.HarasyProject.entity.branch.TableEntity;
import group5.swp.HarasyProject.entity.order.OrderEntity;
import group5.swp.HarasyProject.entity.order.OrderItemEntity;
import group5.swp.HarasyProject.entity.order.OrderItemId;
import group5.swp.HarasyProject.enums.OrderItemStatus;
import group5.swp.HarasyProject.enums.PaymentStatus;
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


    @Override
    public ApiResponse<Page<OrderResponse>> getAllOrders(Pageable pageable) {
        Page<OrderEntity> orderEntities = orderService.getAllOrders(pageable);
        return ApiResponse.<Page<OrderResponse>>builder()
                .data(orderEntities.map(orderService::toResponse))
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
    public ApiResponse<OrderResponse> getOrder(int orderId) {
        return ApiResponse.<OrderResponse>builder()
                .data(toResponse(orderId))
                .build();
    }

    @Override
    public ApiResponse<OrderResponse> createOrder(OrderRequest orderRequest) {
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
        order = orderService.save(order.calculateTotal());
        return ApiResponse.<OrderResponse>builder()
                .data(toResponse(order.getId()))
                .build();
    }


    @Override
    @Transactional
    public ApiResponse<OrderResponse> updateOrder(int orderId,OrderRequest request) {
        OrderEntity order = orderService.getOrderById(orderId);
        if(order.getPaymentStatus().equals(PaymentStatus.PAYED))
            throw new AppException(ErrorCode.ORDER_WAS_CLOSED);
        updateOrderItemInOrder(request,order);
        createOrderItem(request,order);
        if(request.getNote()!=null) order.setNote(request.getNote());
        orderService.save(order.calculateTotal());
        return  ApiResponse.<OrderResponse>builder()
                .data(toResponse(order.getId()))
                .build();
    }


    private  List<OrderItemEntity> createOrderItem(OrderRequest request, OrderEntity order){
        if(request.getOrderItems().getCreates()!=null){
            return toOrderItems(request.getOrderItems().getCreates(),order);
        }
        return null;
    }

    private void updateOrderItemInOrder(OrderRequest request, OrderEntity order) {
        if(request.getOrderItems().getUpdates()!=null){
            for (OrderItemRequest orderItemRequest : request.getOrderItems().getUpdates()) {
                OrderItemEntity item = orderItemService
                        .findByOrderIdAndFoodId(order.getId(),orderItemRequest.getFoodId());
                if (!item.getStatus().equals(OrderItemStatus.PENDING)) {
                    if (orderItemRequest.getQuantity() != null) {
                        if (orderItemRequest.getQuantity() <= item.getQuantity()) continue;
                    }
                }
                item = orderItemService.mapUpdateOrderItem(orderItemRequest,item);
                orderItemService.save(item.calculatePrice());
            }
        }
    }



    private CustomerAccountEntity getCustomerAccount(CustomerOrderRequest request) {
        int id;
        if (request.getCustomerId() != null) {
            id = request.getCustomerId();
        } else {
            id = accountService.quickCustomerRegis(request.getNewCustomer()).getData().getId();
        }
        return accountService.getCustomerAccount(id);
    }

    private List<OrderItemEntity> toOrderItems(List<OrderItemRequest> request, OrderEntity order) {
        return request
                .stream().map(item -> toOrderItem(item,order))
                .toList();
    }

    private OrderItemEntity toOrderItem(OrderItemRequest request,OrderEntity order) {
        return OrderItemEntity.builder()
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
    }

    private OrderResponse toResponse(int orderId) {
        OrderEntity order = orderService.getOrderById(orderId);
        return orderService.toResponse(order.calculateTotal());
    }

}
