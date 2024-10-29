package group5.swp.HarasyProject.controller;

import group5.swp.HarasyProject.dto.request.branch.CreateBranchRequest;
import group5.swp.HarasyProject.dto.request.branch.UpdateBranchRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.branch.BranchInfoResponse;
import group5.swp.HarasyProject.dto.response.branch.BranchListResponse;
import group5.swp.HarasyProject.dto.response.menu.MenuResponse;
import group5.swp.HarasyProject.dto.response.table.TableResponse;
import group5.swp.HarasyProject.service.BranchService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class BranchController {

    BranchService branchService;

    @GetMapping("/staff/branches")
    ApiResponse<List<BranchInfoResponse>> getAllBranchStaff() {
        return branchService.getAllBranches(true);
    }


    @GetMapping("/customer/branches")
    ApiResponse<List<BranchInfoResponse>> getAllBranch() {
        return branchService.getAllBranches(false);
    }


    @GetMapping("/branch/{id}")
    ApiResponse<BranchInfoResponse> getBranchById(@PathVariable int id) {
        return branchService.getBranchInfo(id);
    }

    @PostMapping("/branch")
    ApiResponse<BranchInfoResponse> createBranch(@RequestBody CreateBranchRequest request){
        return branchService.createBranch(request);
    }

    @PutMapping("/branch/{id}")
    ApiResponse<BranchInfoResponse> updateBranch(@PathVariable int id, @RequestBody UpdateBranchRequest request){
        return branchService.updateBranch(id, request);
    }

    @DeleteMapping("/branch/{id}")
    ApiResponse<?> deleteBranch(@PathVariable int id) {
       return branchService.deleteBranch(id);
    }

    @GetMapping("/branch/{id}/tables")
    ApiResponse<List<TableResponse>> tablesInBranch(@PathVariable int id) {
        return branchService.getAllTablesInBranch(id);
    }

    @PostMapping("/branch/{id}/tables")
    ApiResponse<BranchInfoResponse> addTables(@PathVariable int id, @RequestBody CreateBranchRequest request){
        return branchService.addTables(id, request);
    }

    @GetMapping("/branch/{id}/menus")
    ApiResponse<List<MenuResponse>> getAllMenus(@PathVariable int id) {
        return branchService.getAllMenusInBranch(id);
    }

    @PostMapping("/branch/{id}/menus")
    ApiResponse<BranchInfoResponse> addMenus(@PathVariable int id, @RequestBody CreateBranchRequest request){
        return branchService.addMenus(id, request);
    }
}
