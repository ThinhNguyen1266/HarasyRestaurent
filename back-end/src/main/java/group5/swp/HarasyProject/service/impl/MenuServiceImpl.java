package group5.swp.HarasyProject.service.impl;

import group5.swp.HarasyProject.dto.request.menu.MenuRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.food.FoodResponse;
import group5.swp.HarasyProject.dto.response.menu.MenuResponse;
import group5.swp.HarasyProject.entity.food.FoodEntity;
import group5.swp.HarasyProject.entity.menu.MenuEntity;
import group5.swp.HarasyProject.entity.menu.MenuItemEntity;
import group5.swp.HarasyProject.entity.menu.MenuItemId;
import group5.swp.HarasyProject.enums.ErrorCode;
import group5.swp.HarasyProject.exception.AppException;
import group5.swp.HarasyProject.mapper.FoodMapper;
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
    FoodMapper foodMapper;
    @Override
    public ApiResponse<MenuResponse> updateMenu(int menuId,MenuRequest menuRequest) {
        MenuEntity menuEntity = menuRepository.findById(menuId)
                .orElseThrow(()->new AppException(ErrorCode.MENU_NOT_FOUND ));
        menuEntity = menuMapper.updateMenu(menuRequest, menuEntity);
        menuEntity = menuRepository.save(menuEntity);
        MenuResponse menuResponse = menuMapper.toMenuResponse(menuEntity);
        return ApiResponse.<MenuResponse>builder()
                .data(menuResponse)
                .build();
    }

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
    public ApiResponse<List<FoodResponse>> getAllFoodsInMenu(int menuId) {
        if (!menuRepository.existsById(menuId)) {
            throw new AppException(ErrorCode.MENU_NOT_FOUND);
        }
        List<MenuItemEntity> items = menuItemRepository.findByMenuId(menuId);
        List<FoodEntity> foods = items.stream().map(MenuItemEntity::getFood).toList();
        List<FoodResponse> responses = foods
                .stream().map(foodMapper::toResponse)
                .toList();
        return ApiResponse.<List<FoodResponse>>builder()
                .data(responses)
                .build();
    }

    @Override
    public ApiResponse<?> addFood(int menuId, List<Integer> foodIds) {
        MenuEntity menu = menuRepository.findById(menuId)
                .orElseThrow(()->new AppException(ErrorCode.MENU_NOT_FOUND));
        List<FoodEntity> foods = foodRepository.findAllById(foodIds);
        List<MenuItemEntity> items = foods
                .stream().map(foodEntity -> menuItemMapper.toEntity(menu,foodEntity))
                .toList();
        menuItemRepository.saveAll(items);

        return ApiResponse.builder().build();
    }

    @Override
    public ApiResponse<?> deleteFood(int menuId, List<Integer> foodIds) {
        if(!menuRepository.existsById(menuId))throw new AppException(ErrorCode.MENU_NOT_FOUND);
        List<MenuItemEntity> items =  foodIds
                .stream().map(id-> menuItemRepository
                        .findById(new MenuItemId(menuId,id))
                        .orElseThrow(()-> new AppException(ErrorCode.FOOD_NOT_FOUND)))
                .toList();
        menuItemRepository.deleteAll(items);
        return ApiResponse.builder().build();
    }
}
