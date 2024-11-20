package group5.swp.HarasyProject.service.impl;

import group5.swp.HarasyProject.dto.response.order.OrderResponse;
import group5.swp.HarasyProject.entity.order.OrderEntity;
import group5.swp.HarasyProject.exception.AppException;
import group5.swp.HarasyProject.exception.ErrorCode;
import group5.swp.HarasyProject.mapper.OrderMapper;
import group5.swp.HarasyProject.repository.OrderRepository;
import group5.swp.HarasyProject.service.OrderService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    OrderRepository orderRepository;
    OrderMapper orderMapper;


    @Override
    public Page<OrderEntity> getAllOrders(Pageable pageable) {
        return orderRepository.findAll(pageable);
    }

    @Override
    public Page<OrderEntity> getOrdersByBranchId(int branchId, Pageable pageable) {
        return orderRepository.findByBranchId(branchId, pageable);
    }

    @Override
    public Page<OrderEntity> getOrdersByCustomerId(int customerId, Pageable pageable) {
        return orderRepository.findByCustomerId(customerId, pageable);
    }

    @Override
    public OrderEntity getOrderById(int id) {
        return orderRepository.getOrderWithItems(id)
                .orElseThrow(()->new AppException(ErrorCode.ORDER_NOT_FOUND));
    }

    @Override
    public List<OrderEntity> getBranchOrdersInTime(int branchId) {
        return orderRepository.findBranchInTimeOrder(branchId);
    }

    @Override
    public OrderEntity save(OrderEntity order) {
        return orderRepository.save(order);
    }

    @Override
    public OrderResponse toResponse(OrderEntity order) {
        return orderMapper.toResponse(order);
    }

    @Override
    public Long getRevenueByDay(LocalDate specificDate) {
        return orderRepository.calculateRevenueByDay(specificDate);
    }

    @Override
    public List<Object[]> getDailyRevenueInMonth(int month, int year) {
        return orderRepository.calculateDailyRevenueInMonth(month, year);
    }

    @Override
    public Long getRevenueByMonth(int month, int year) {
        return orderRepository.calculateRevenueByMonth(month, year);
    }

    @Override
    public List<Object[]> getMonthlyRevenueInYear(int year) {
        return orderRepository.calculateMonthlyRevenueInYear(year);
    }

    @Override
    public Long getRevenueByYear(int year) {
        return orderRepository.calculateRevenueByYear(year);
    }

    @Override
    public List<Object[]> getTotalRevenueForAllYears() {
        return orderRepository.calculateTotalRevenueForAllYears();
    }
}
