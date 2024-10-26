package group5.swp.HarasyProject.service;

import group5.swp.HarasyProject.dto.request.menu.MenuRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.menu.MenuResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface MenuService {
    ApiResponse<MenuResponse> updateMenu(int menuId,MenuRequest menuRequest);
    ApiResponse<?> deleteMenu(int menuId);
    ApiResponse<MenuResponse> getMenu(int menuId);
}
