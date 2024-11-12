package group5.swp.HarasyProject.controller;

import group5.swp.HarasyProject.dto.request.branch.BranchRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.branch.BranchInfoHomeResponse;
import group5.swp.HarasyProject.dto.response.branch.BranchResponse;
import group5.swp.HarasyProject.dto.response.branch.BranchesViewResponse;
import group5.swp.HarasyProject.service.RestaurantManagementService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class BranchController {

    RestaurantManagementService restaurantManagementService;

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
    ApiResponse<BranchResponse> createBranch(@RequestBody BranchRequest request){
        return restaurantManagementService.createBranch(request);
    }

    @PutMapping("/branch/{id}")
    ApiResponse<BranchResponse> updateBranch(@PathVariable int id, @RequestBody BranchRequest request){
        return restaurantManagementService.updateBranch(id, request);
    }

    @DeleteMapping("/branch/{id}")
    ApiResponse<?> deleteBranch(@PathVariable int id) {
       return restaurantManagementService.deleteBranch(id);
    }


}
