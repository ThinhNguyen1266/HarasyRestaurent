package group5.swp.HarasyProject.controller;

import group5.swp.HarasyProject.dto.request.branch.CreateBranchRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.branch.BranchInfoResponse;
import group5.swp.HarasyProject.dto.response.branch.BranchListResponse;
import group5.swp.HarasyProject.service.BranchService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class BranchController {

    BranchService branchService;

    @GetMapping("/branches")
    ApiResponse<Set<BranchListResponse>> getAllBranch() {
        return branchService.getAllBranches();
    }


    @GetMapping("/branch/{id}")
    ApiResponse<BranchInfoResponse> getBranchById(@PathVariable int id) {
        return branchService.getBranchInfo(id);
    }

    @PostMapping("/branch")
    ApiResponse<BranchInfoResponse> createBranch(@RequestBody CreateBranchRequest request){
        return branchService.createBranch(request);
    }
}
