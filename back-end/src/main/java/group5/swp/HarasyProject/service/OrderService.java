package group5.swp.HarasyProject.service;

import group5.swp.HarasyProject.dto.response.order.OrderResponse;
import group5.swp.HarasyProject.entity.order.OrderEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public interface OrderService {
    Page<OrderEntity> getAllOrders(Pageable pageable);
    Page<OrderEntity> getOrdersByBranchId(int branchId, Pageable pageable);
    Page<OrderEntity> getOrdersByCustomerId(int customerId, Pageable pageable);
    List<OrderEntity> getBranchOrdersInTime(int branchId);
    OrderEntity getOrderById(int id);
    OrderEntity save(OrderEntity order);
    OrderResponse toResponse(OrderEntity order);
    public Long getRevenueByDay(LocalDate specificDate);

    public List<Object[]> getDailyRevenueInMonth(int month, int year);

    public Long getRevenueByMonth(int month, int year);

    public List<Object[]> getMonthlyRevenueInYear(int year);

    public Long getRevenueByYear(int year);

    public List<Object[]> getTotalRevenueForAllYears();
}
