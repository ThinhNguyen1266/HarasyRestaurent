package group5.swp.HarasyProject.service.impl;

import group5.swp.HarasyProject.dto.request.menu.MenuRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.menu.MenuResponse;
import group5.swp.HarasyProject.entity.food.FoodEntity;
import group5.swp.HarasyProject.entity.menu.MenuEntity;
import group5.swp.HarasyProject.entity.menu.MenuItemEntity;
import group5.swp.HarasyProject.entity.menu.MenuItemId;
import group5.swp.HarasyProject.exception.ErrorCode;
import group5.swp.HarasyProject.exception.AppException;
import group5.swp.HarasyProject.mapper.MenuItemMapper;
import group5.swp.HarasyProject.mapper.MenuMapper;
import group5.swp.HarasyProject.repository.FoodRepository;
import group5.swp.HarasyProject.repository.MenuItemRepository;
import group5.swp.HarasyProject.repository.MenuRepository;
import group5.swp.HarasyProject.service.MenuService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@RequiredArgsConstructor
public class MenuServiceImpl implements MenuService {

    MenuRepository menuRepository;
    MenuMapper menuMapper;
    MenuItemRepository menuItemRepository;
    FoodRepository foodRepository;
    MenuItemMapper menuItemMapper;

    @Override
    public ApiResponse<?> deleteMenu(int menuId) {
        if(menuRepository.existsById(menuId)) {
            menuRepository.deleteById(menuId);
        }else throw new AppException(ErrorCode.MENU_NOT_FOUND);
        return ApiResponse.builder().build();
    }

    @Override
    public ApiResponse<MenuResponse> getMenu(int menuId) {
        MenuEntity menuEntity = menuRepository.findById(menuId)
                .orElseThrow(() -> new AppException(ErrorCode.MENU_NOT_FOUND));
        MenuResponse response = menuMapper.toMenuResponse(menuEntity);
        return ApiResponse.<MenuResponse>builder()
                .data(response)
                .build();
    }


    @Override
    public void addFood(int menuId, List<Integer> foodIds) {
        MenuEntity menu = menuRepository.findById(menuId)
                .orElseThrow(()->new AppException(ErrorCode.MENU_NOT_FOUND));
        List<FoodEntity> foods = foodRepository.findAllById(foodIds);
        List<MenuItemEntity> items = foods
                .stream().map(foodEntity -> menuItemMapper.toEntity(menu,foodEntity))
                .toList();
        menuItemRepository.saveAll(items);
    }

    @Override
    public void deleteFood(int menuId, List<Integer> foodIds) {
        if(!menuRepository.existsById(menuId))throw new AppException(ErrorCode.MENU_NOT_FOUND);
        List<MenuItemEntity> items =  foodIds
                .stream().map(id-> menuItemRepository
                        .findById(new MenuItemId(menuId,id))
                        .orElseThrow(()-> new AppException(ErrorCode.FOOD_NOT_FOUND)))
                .toList();
        menuItemRepository.deleteAll(items);
    }

    @Override
    public List<MenuEntity> toMenus(List<MenuRequest> menuRequests) {
        return menuMapper.toMenuEntities(menuRequests);
    }

    @Override
    public void saveUpdate(List<MenuEntity> menuEntities) {
        menuRepository.saveAll(menuEntities);
    }

    @Override
    public MenuEntity mapUpdateMenu(MenuRequest request, MenuEntity menuEntity) {
        return menuMapper.updateMenu(request, menuEntity);
    }

    @Override
    public MenuResponse mapMenuResponse(MenuEntity menu) {
        return menuMapper.toMenuResponse(menu);
    }

    @Override
    public List<MenuEntity> getAllMenusInBranch(int branchId,boolean isIncludeAll) {
        return menuRepository.findMenusInBranch(branchId,isIncludeAll);
    }
}
