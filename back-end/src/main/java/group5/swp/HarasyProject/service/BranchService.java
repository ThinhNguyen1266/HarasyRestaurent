package group5.swp.HarasyProject.service;

import group5.swp.HarasyProject.dto.request.branch.BranchInfoRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.branch.BranchInfoHomeResponse;
import group5.swp.HarasyProject.dto.response.branch.BranchResponse;
import group5.swp.HarasyProject.dto.response.branch.BranchesViewResponse;
import group5.swp.HarasyProject.entity.branch.BranchEntity;
import group5.swp.HarasyProject.entity.branch.TableEntity;
import group5.swp.HarasyProject.entity.menu.MenuEntity;
import org.springframework.stereotype.Service;

import java.util.List;



@Service
public interface BranchService {

    ApiResponse<List<BranchesViewResponse>> getBranchesView();
    ApiResponse<BranchInfoHomeResponse> getBranchHomeInfo(int branchId);

    ApiResponse<List<BranchResponse>> getAllBranches(boolean includeAll);
    ApiResponse<BranchResponse> getBranchResponse(int branchId);

    BranchEntity createBranch(BranchInfoRequest request);
    BranchEntity updateBranch(Integer id , BranchInfoRequest request);
    ApiResponse<?> deleteBranch(Integer branchId);

    void addTables(List<TableEntity> tables, BranchEntity branch);
    void addMenus(List<MenuEntity> menus, BranchEntity branch);

    BranchEntity getBranchEntity(int branchId);
    BranchEntity saveBranch(BranchEntity branch);
    BranchResponse toBranchResponse(BranchEntity branch);



}
