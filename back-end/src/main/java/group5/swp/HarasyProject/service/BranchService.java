package group5.swp.HarasyProject.service;

import group5.swp.HarasyProject.dto.request.branch.CreateBranchRequest;
import group5.swp.HarasyProject.dto.request.branch.UpdateBranchRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.branch.BranchInfoResponse;
import group5.swp.HarasyProject.dto.response.branch.BranchListResponse;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Set;

@Service
public interface BranchService {
    ApiResponse<Set<BranchListResponse>> getAllBranches();

    ApiResponse<BranchInfoResponse> getBranchInfo(int branchId);

    ApiResponse<BranchInfoResponse> createBranch(CreateBranchRequest request);

    ApiResponse<BranchInfoResponse> updateBranch(Integer id , UpdateBranchRequest request);

    ApiResponse<?> deleteBranch(Integer id);
}
