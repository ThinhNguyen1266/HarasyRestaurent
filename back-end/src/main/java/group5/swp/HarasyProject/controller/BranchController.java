package group5.swp.HarasyProject.controller;

import group5.swp.HarasyProject.dto.request.branch.BranchRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.branch.BranchInfoHomeResponse;
import group5.swp.HarasyProject.dto.response.branch.BranchResponse;
import group5.swp.HarasyProject.dto.response.branch.BranchesViewResponse;
import group5.swp.HarasyProject.dto.response.menu.MenuResponse;
import group5.swp.HarasyProject.dto.response.order.OrderResponse;
import group5.swp.HarasyProject.dto.response.reservation.ReservationResponse;
import group5.swp.HarasyProject.dto.response.table.TableResponse;
import group5.swp.HarasyProject.service.BusinessManagementService;
import group5.swp.HarasyProject.service.RestaurantManagementService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class BranchController {

    RestaurantManagementService restaurantManagementService;
    BusinessManagementService businessManagementService;


    @GetMapping("/branches/home")
    ApiResponse<List<BranchesViewResponse>> getBranchesHome() {
        return restaurantManagementService.getBranchesView();
    }

    @GetMapping("/branch/home/{id}")
    ApiResponse<BranchInfoHomeResponse> getBranchInfoHome(@PathVariable int id) {
        return restaurantManagementService.getBranchHome(id);
    }


    @GetMapping("/branches")
    ApiResponse<List<BranchResponse>> getAllBranchStaff(@RequestParam(defaultValue = "false") boolean includeAll) {
        return restaurantManagementService.getAllBranches(includeAll);
    }

    @GetMapping("/branch/{id}")
    ApiResponse<BranchResponse> getBranchById(@PathVariable int id) {
        return restaurantManagementService.getBranch(id);
    }

    @PostMapping("/branch")
    ApiResponse<BranchResponse> createBranch(@RequestBody BranchRequest request) {
        return restaurantManagementService.createBranch(request);
    }

    @PutMapping("/branch/{id}")
    ApiResponse<BranchResponse> updateBranch(@PathVariable int id, @RequestBody BranchRequest request) {
        return restaurantManagementService.updateBranch(id, request);
    }

    @DeleteMapping("/branch/{id}")
    ApiResponse<?> deleteBranch(@PathVariable int id) {
        return restaurantManagementService.deleteBranch(id);
    }


    @GetMapping("/branch/{id}/menus")
    ApiResponse<List<MenuResponse>> getAllMenus(@PathVariable int id,
                                                @RequestParam(defaultValue = "false") boolean includeAll) {
        return restaurantManagementService.getAllMenusInBranch(id,includeAll);
    }

    @GetMapping("/branch/{id}/tables")
    ApiResponse<List<TableResponse>> getAllTables(@PathVariable int id){
        return restaurantManagementService.getAllTablesInBranch(id);
    }

    @GetMapping("/branch/{id}/orders")
    ApiResponse<Page<OrderResponse>> getBranchOrders(
            @PathVariable int id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String direction) {
        Sort.Direction sortDirection = direction.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sortBy = Sort.by(sortDirection, sort);
        Pageable pageable = PageRequest.of(page, size, sortBy);
        return restaurantManagementService.getOrdersInBranch(id, pageable);
    }


    @GetMapping("branch/{id}/reserve")
    ApiResponse<Page<ReservationResponse>> getAllReservation(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(defaultValue = "false") Boolean isHistory,
            @PathVariable int id) {
        Sort.Direction sortDirection = direction.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sortBy = Sort.by(sortDirection, sort);
        Pageable pageable = PageRequest.of(page, size, sortBy);
        return businessManagementService.getAllReservationsInBranch(pageable,isHistory,id);
    }
}
