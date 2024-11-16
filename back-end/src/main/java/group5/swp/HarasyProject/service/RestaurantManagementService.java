package group5.swp.HarasyProject.service;

import group5.swp.HarasyProject.dto.request.branch.BranchRequest;
import group5.swp.HarasyProject.dto.request.food.FoodRequest;
import group5.swp.HarasyProject.dto.request.menu.FoodInMenuRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.branch.BranchInfoHomeResponse;
import group5.swp.HarasyProject.dto.response.branch.BranchResponse;
import group5.swp.HarasyProject.dto.response.branch.BranchesViewResponse;
import group5.swp.HarasyProject.dto.response.food.FoodResponse;
import group5.swp.HarasyProject.dto.response.menu.MenuResponse;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.util.List;

@Service
public interface RestaurantManagementService {
    ApiResponse<List<BranchesViewResponse>> getBranchesView();
    ApiResponse<BranchInfoHomeResponse> getBranchHome(int branchId);

    ApiResponse<BranchResponse> getBranch(int branchId);
    ApiResponse<List<BranchResponse>> getAllBranches(boolean includeAll);
    ApiResponse<BranchResponse> createBranch(BranchRequest request);
    ApiResponse<BranchResponse> updateBranch(int branchId, BranchRequest request);
    ApiResponse<MenuResponse> getMenu(int menuId);

    ApiResponse<MenuResponse> addFoodsToMenu(int menuId, FoodInMenuRequest request);
    ApiResponse<MenuResponse> deleteFoodsFromMenu(int menuId, FoodInMenuRequest request);
    ApiResponse<List<FoodResponse>> getFoods(boolean includeAll);
    ApiResponse<FoodResponse> getFood(int foodId);
    ApiResponse<FoodResponse> createFood(FoodRequest request);
    ApiResponse<FoodResponse> updateFood(int foodId, FoodRequest request);
    ApiResponse<?> deleteFood(int foodId);
    ApiResponse<?> deleteBranch(Integer branchId);
    ApiResponse<?> deleteTable(Integer tableId);
    ApiResponse<?> deleteMenu(Integer menuId);
}
