package group5.swp.HarasyProject.controller;

import group5.swp.HarasyProject.dto.request.menu.MenuRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.menu.MenuResponse;
import group5.swp.HarasyProject.service.MenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequiredArgsConstructor
public class MenuController {

    private final MenuService menuService;

    @GetMapping("/menus")
    public ResponseEntity<ApiResponse<List<MenuResponse>>> getAllMenus() {
        return ResponseEntity.ok(menuService.getAllMenus());
    }

    @GetMapping("/menu/{id}")
    public ResponseEntity<ApiResponse<MenuResponse>> getMenuById(@PathVariable Integer id) {
        return ResponseEntity.ok(menuService.getMenuById(id));
    }

    @PostMapping("/menu")
    public ResponseEntity<ApiResponse<MenuResponse>> createMenu(@RequestBody MenuRequest menuRequest) {
        return ResponseEntity.ok(menuService.createMenu(menuRequest));
    }

    @PutMapping("/menu/{id}")
    public ResponseEntity<ApiResponse<MenuResponse>> updateMenu(@PathVariable Integer id, @RequestBody MenuRequest menuRequest) {
        return ResponseEntity.ok(menuService.updateMenu(id, menuRequest));
    }

    @DeleteMapping("/menu/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteMenu(@PathVariable Integer id) {
        return ResponseEntity.ok(menuService.deleteMenu(id));
    }
}
