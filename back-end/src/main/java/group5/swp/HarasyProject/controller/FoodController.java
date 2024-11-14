package group5.swp.HarasyProject.controller;


import group5.swp.HarasyProject.dto.request.food.FoodRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.food.FoodResponse;
import group5.swp.HarasyProject.service.RestaurantManagementService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class FoodController {
    RestaurantManagementService restaurantManagementService;


    @GetMapping("/foods")
    public ApiResponse<List<FoodResponse>> getAllFoods(@RequestParam(required = false) boolean includeAll) {
        return restaurantManagementService.getFoods(includeAll);
    }

    @GetMapping("/food/{id}")
    public ApiResponse<FoodResponse> getFood(@PathVariable int id) {
        return restaurantManagementService.getFood(id);
    }

    @PostMapping("/food")
    public ApiResponse<FoodResponse> addFood(@RequestBody FoodRequest request) {
        return restaurantManagementService.createFood(request);
    }

    @PutMapping("/food/{id}")
    public ApiResponse<FoodResponse> updateFood(@PathVariable int id, @RequestBody FoodRequest request) {
        return restaurantManagementService.updateFood(id, request);
    }

    @DeleteMapping("/food/{id}")
    public ApiResponse<?> deleteFood(@PathVariable int id) {
        return restaurantManagementService.deleteFood(id);
    }

}
