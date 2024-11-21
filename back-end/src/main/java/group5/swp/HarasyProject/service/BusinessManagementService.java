package group5.swp.HarasyProject.service;


import group5.swp.HarasyProject.dto.request.order.OrderRequest;
import group5.swp.HarasyProject.dto.request.reservation.CheckReserveTimeRequest;
import group5.swp.HarasyProject.dto.request.reservation.CustomerReserveRequest;
import group5.swp.HarasyProject.dto.request.reservation.ReservationRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.order.OrderResponse;
import group5.swp.HarasyProject.dto.response.reservation.AvailableReserveTimeResponse;
import group5.swp.HarasyProject.dto.response.reservation.ReservationResponse;
import group5.swp.HarasyProject.dto.response.table.TableResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public interface BusinessManagementService {
    ApiResponse<Page<OrderResponse>> getAllOrders(Pageable pageable);

    ApiResponse<List<OrderResponse>> getAllInTimeOrders(int branchId);

    ApiResponse<Page<OrderResponse>> getAllCusOrders(Pageable pageable, int customerId);

    ApiResponse<OrderResponse> getOrder(int orderId);

    ApiResponse<OrderResponse> createOrder(OrderRequest orderRequest);

    ApiResponse<OrderResponse> updateOrder(int orderId, OrderRequest orderRequest);

    ApiResponse<OrderResponse> deleteOrderItem(int orderId, int foodId);

    ApiResponse<AvailableReserveTimeResponse> getAvailableReserveTime(CheckReserveTimeRequest request);

    ApiResponse<ReservationResponse> customerReservation(CustomerReserveRequest request);

    ApiResponse<ReservationResponse> createReservation(ReservationRequest request);

    ApiResponse<Page<ReservationResponse>> getAllReservationsInBranch(Pageable pageable, Boolean isHistory, int branchId);

    ApiResponse<Page<ReservationResponse>> getAllCusReservations(Pageable pageable, int customerId);

    ApiResponse<ReservationResponse> getReservation(int id);

    ApiResponse<ReservationResponse> updateReservation(ReservationRequest request, int id);

    ApiResponse<List<TableResponse>> getAvailableTable(CheckReserveTimeRequest request);

    Long getRevenueByDay(LocalDate specificDate);

    List<Object[]> getDailyRevenueInMonth(int month, int year);

    Long getRevenueByMonth(int month, int year);

    List<Object[]> getMonthlyRevenueInYear(int year);

    Long getRevenueByYear(int year);

    List<Object[]> getTotalRevenueForAllYears();

    Long getRevenueAll();

    Integer getTotalOrders();

    List<Object[]> getBranchesTotalRevenue();
    List<Object[]> getBranchesTotalRevenueInMonth();

    List<Object[]> getBestSeller();
}
