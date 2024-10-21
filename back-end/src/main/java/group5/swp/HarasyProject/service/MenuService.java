package group5.swp.HarasyProject.service;

import group5.swp.HarasyProject.dto.request.menu.MenuRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.menu.MenuResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface MenuService {

    ApiResponse<List<MenuResponse>> getAllMenus();

    ApiResponse<MenuResponse> getMenuById(Integer id);

    ApiResponse<MenuResponse> createMenu(MenuRequest menuRequest);

    ApiResponse<MenuResponse> updateMenu(Integer id, MenuRequest menuRequest);

    ApiResponse<Void> deleteMenu(Integer id);
}
