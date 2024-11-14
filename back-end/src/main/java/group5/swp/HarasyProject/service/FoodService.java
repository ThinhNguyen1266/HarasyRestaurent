package group5.swp.HarasyProject.service;

import group5.swp.HarasyProject.dto.request.food.FoodRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.food.FoodResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface FoodService {
    ApiResponse<List<FoodResponse>> getAllFood(boolean includeAll);

    ApiResponse<FoodResponse> getFood(int id);
    ApiResponse<FoodResponse> createFood(FoodRequest request);
    ApiResponse<FoodResponse> updateFood(int id,FoodRequest request);
    ApiResponse<?> deleteFood(int id);
}
