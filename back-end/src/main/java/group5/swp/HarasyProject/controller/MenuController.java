package group5.swp.HarasyProject.controller;

import group5.swp.HarasyProject.dto.request.menu.FoodInMenuRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.menu.MenuResponse;
import group5.swp.HarasyProject.service.RestaurantManagementService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class MenuController {
    RestaurantManagementService restaurantManagementService;


    @GetMapping("/menu/{id}")
    public ApiResponse<MenuResponse> getMenu(@PathVariable int id) {
        return restaurantManagementService.getMenu(id);
    }

    @DeleteMapping("/menu/{id}")
    public ApiResponse<?> deleteMenu(@PathVariable int id) {
        return restaurantManagementService.deleteMenu(id);
    }


    @PostMapping("/menu/{id}/foods")
    public ApiResponse<MenuResponse> addFoods(@PathVariable int id, @RequestBody FoodInMenuRequest foodIds) {
        return restaurantManagementService.addFoodsToMenu(id, foodIds);
    }

    @DeleteMapping("/menu/{id}/foods")
    public ApiResponse<?> deleteFoods(@PathVariable int id, @RequestBody FoodInMenuRequest foodIds) {
        return restaurantManagementService.deleteFoodsFromMenu(id, foodIds);
    }

}
