package group5.swp.HarasyProject.service;

import group5.swp.HarasyProject.dto.request.branch.CreateBranchRequest;
import group5.swp.HarasyProject.dto.request.branch.UpdateBranchRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.branch.BranchInfoResponse;
import group5.swp.HarasyProject.dto.response.branch.BranchListResponse;
import group5.swp.HarasyProject.dto.response.menu.MenuResponse;
import group5.swp.HarasyProject.dto.response.table.TableResponse;
import org.springframework.stereotype.Service;


import java.util.List;



@Service
public interface BranchService {
    ApiResponse<List<BranchInfoResponse>> getAllBranches(boolean isStaff);

    ApiResponse<BranchInfoResponse> getBranchInfo(int branchId);

    ApiResponse<BranchInfoResponse> createBranch(CreateBranchRequest request);

    ApiResponse<BranchInfoResponse> updateBranch(Integer id , UpdateBranchRequest request);

    ApiResponse<?> deleteBranch(Integer BranchId);

    ApiResponse<List<TableResponse>> getAllTablesInBranch(int branchId);

    ApiResponse<BranchInfoResponse> addTables(Integer branchId, CreateBranchRequest request );

    ApiResponse<List<MenuResponse>> getAllMenusInBranch(int branchId);

    ApiResponse<BranchInfoResponse> addMenus(Integer branchId, CreateBranchRequest request);
}
