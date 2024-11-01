package group5.swp.HarasyProject.controller;


import group5.swp.HarasyProject.dto.request.food.FoodRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.food.FoodResponse;
import group5.swp.HarasyProject.service.FoodService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class FoodController {
    FoodService foodService;

    @GetMapping("/foods")
    public ApiResponse<List<FoodResponse>> getAllFoods(@RequestParam(required = false) boolean includeAll) {
        return foodService.getAllFood(  includeAll);
    }

    @GetMapping("/food/{id}")
    public ApiResponse<FoodResponse> getFoodById(@PathVariable int id) {
        return foodService.getFoodById(id);
    }

    @PostMapping("/food")
    public ApiResponse<FoodResponse> addFood(@RequestBody FoodRequest request) {
        return foodService.createFood(request);
    }

    @PutMapping("/food/{id}")
    public ApiResponse<FoodResponse> updateFood(@PathVariable int id, @RequestBody FoodRequest request) {
        return foodService.updateFood(id, request);
    }

    @DeleteMapping("/food/{id}")
    public ApiResponse<?> deleteFood(@PathVariable int id) {
        return foodService.deleteFood(id);
    }
}
