package group5.swp.HarasyProject.controller;

import group5.swp.HarasyProject.dto.request.order.OrderRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.order.OrderResponse;
import group5.swp.HarasyProject.service.BusinessManagementService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class OrderController {
    BusinessManagementService businessManagementService;

    @GetMapping("/order")
    public ApiResponse<Page<OrderResponse>> getAllOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String direction
    ) {
        Sort.Direction sortDirection = direction.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sortBy = Sort.by(sortDirection, sort);
        Pageable pageable = PageRequest.of(page, size, sortBy);
        return businessManagementService.getAllOrders(pageable);
    }

    @GetMapping("customer/{customerId}/order")
    public ApiResponse<Page<OrderResponse>> getAllCustomerOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String direction,
            @PathVariable int customerId
    ) {
        Sort.Direction sortDirection = direction.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sortBy = Sort.by(sortDirection, sort);
        Pageable pageable = PageRequest.of(page, size, sortBy);
        return businessManagementService.getAllCusOrders(pageable, customerId);
    }

    @GetMapping("/orderInTime/{branchId}")
    public ApiResponse<List<OrderResponse>> getAllOrdersInTime(@PathVariable int branchId){
        return businessManagementService.getAllInTimeOrders(branchId);
    }

    @GetMapping("/order/{id}")
    public ApiResponse<OrderResponse> getOrder(@PathVariable int id) {
        return businessManagementService.getOrder(id);
    }

    @PostMapping("/order")
    ApiResponse<OrderResponse> createOrder(@RequestBody OrderRequest request) {
        return businessManagementService.createOrder(request);
    }

    @PutMapping("/order/{id}")
    ApiResponse<OrderResponse> updateOrder(@PathVariable int id, @RequestBody OrderRequest request) {
        return businessManagementService.updateOrder(id, request);
    }

    @DeleteMapping("/order/{orderId}/food/{foodId}")
    ApiResponse<OrderResponse> deleteOrder(@PathVariable int orderId, @PathVariable int foodId) {
       return  businessManagementService.deleteOrderItem(orderId, foodId);
    }

    @GetMapping("/revenue/day")
    public ApiResponse<?> getRevenueByDay(@RequestParam("date") String date) {
        LocalDate specificDate = LocalDate.parse(date);
        Long revenue = businessManagementService.getRevenueByDay(specificDate);
        return ApiResponse.builder()
                .data(Map.of("date", specificDate, "revenue", revenue != null ? revenue : 0))
                .build();
    }

    @GetMapping("/revenue/month/daily")
    public ApiResponse<?> getDailyRevenueInMonth(@RequestParam("month") int month, @RequestParam("year") int year) {
        List<Object[]> dailyRevenues = businessManagementService.getDailyRevenueInMonth(month, year);
        List<Map<String, Object>> response = new ArrayList<>();
        dailyRevenues.forEach(record -> response.add(Map.of("day", record[0], "revenue", record[1])));
        return ApiResponse.builder()
                .data(response)
                .build();
    }


    @GetMapping("/revenue/month")
    public ApiResponse<?> getRevenueByMonth(@RequestParam("month") int month, @RequestParam("year") int year) {
        Long revenue = businessManagementService.getRevenueByMonth(month, year);
        return ApiResponse.builder()
                .data(Map.of("month", month, "year", year, "revenue", revenue != null ? revenue : 0))
                .build();
    }

    @GetMapping("/revenue/year/monthly")
    public ApiResponse<?> getMonthlyRevenueInYear(@RequestParam("year") int year) {
        List<Object[]> monthlyRevenues = businessManagementService.getMonthlyRevenueInYear(year);
        List<Map<String, Object>> response = new ArrayList<>();
        monthlyRevenues.forEach(record -> response.add(Map.of("month", record[0], "revenue", record[1])));
        return ApiResponse.builder()
                .data(response)
                .build();
    }

    @GetMapping("/revenue/year")
    public ApiResponse<?> getRevenueByYear(@RequestParam("year") int year) {
        Long revenue = businessManagementService.getRevenueByYear(year);
        return ApiResponse.builder()
                .data(Map.of("year", year, "revenue", revenue != null ? revenue : 0))
                .build();
    }

    @GetMapping("/revenue/all-years")
    public ApiResponse<?> getTotalRevenueForAllYears() {
        List<Object[]> totalRevenues = businessManagementService.getTotalRevenueForAllYears();
        List<Map<String, Object>> response = new ArrayList<>();
        totalRevenues.forEach(record -> response.add(Map.of("year", record[0], "revenue", record[1])));
        return ApiResponse.builder()
                .data(response)
                .build();
    }
}
