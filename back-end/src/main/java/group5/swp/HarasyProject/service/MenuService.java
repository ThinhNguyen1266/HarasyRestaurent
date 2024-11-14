package group5.swp.HarasyProject.service;

import group5.swp.HarasyProject.dto.request.menu.MenuRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.menu.MenuResponse;
import group5.swp.HarasyProject.entity.menu.MenuEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface MenuService {
    ApiResponse<?> deleteMenu(int menuId);
    ApiResponse<MenuResponse> getMenu(int menuId);
    void saveUpdate(List<MenuEntity> menuEntities);
    void addFood(int menuId, List<Integer> foodIds);
    void deleteFood(int menuId, List<Integer> foodIds);
    List<MenuEntity> toMenus(List<MenuRequest> menuRequests);
    MenuEntity mapUpdateMenu(MenuRequest request, MenuEntity menuEntity);
}
