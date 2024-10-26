package group5.swp.HarasyProject.controller;

import group5.swp.HarasyProject.dto.request.menu.MenuRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.menu.MenuResponse;
import group5.swp.HarasyProject.service.MenuService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class MenuController {

    MenuService menuService;

    @GetMapping("/menu/{id}")
    public ApiResponse<MenuResponse> getMenu(@PathVariable int id) {
        return menuService.getMenu(id);
    }

    @PutMapping("/menu/{id}")
    public ApiResponse<MenuResponse> updateMenu(@PathVariable int id, @RequestBody MenuRequest menuRequest) {
        return menuService.updateMenu(id, menuRequest);
    }

    @DeleteMapping("/menu/{id}")
    public ApiResponse<?> deleteMenu(@PathVariable int id) {
        return menuService.deleteMenu(id);
    }
}
