package group5.swp.HarasyProject.service.impl;

import group5.swp.HarasyProject.dto.request.menu.MenuRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.menu.MenuResponse;
import group5.swp.HarasyProject.entity.menu.MenuEntity;
import group5.swp.HarasyProject.mapper.MenuMapper;
import group5.swp.HarasyProject.repository.MenuRepository;
import group5.swp.HarasyProject.service.MenuService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@RequiredArgsConstructor
public class MenuServiceImpl implements MenuService {

    MenuRepository menuRepository;
    MenuMapper menuMapper;

    @Override
    public ApiResponse<List<MenuResponse>> getAllMenus() {
        List<MenuEntity> menus = menuRepository.findAll();
        List<MenuResponse> menuResponses = menuMapper.toMenuResponseList(menus);
        return ApiResponse.<List<MenuResponse>>builder()
                .data(menuResponses)
                .build();
    }

    @Override
    public ApiResponse<MenuResponse> getMenuById(Integer id) {
        Optional<MenuEntity> menu = menuRepository.findById(id);
        if (menu.isPresent()) {
            MenuResponse menuResponse = menuMapper.toMenuResponse(menu.get());
            return ApiResponse.<MenuResponse>builder()
                    .data(menuResponse)
                    .build();
        }
        return ApiResponse.<MenuResponse>builder()
                .message("Menu not found")
                .success(false)
                .code(404)
                .build();
    }

    @Override
    public ApiResponse<MenuResponse> createMenu(MenuRequest menuRequest) {
        MenuEntity menuEntity = menuMapper.toMenuEntity(menuRequest);
        MenuEntity createdMenu = menuRepository.save(menuEntity);
        MenuResponse response = menuMapper.toMenuResponse(createdMenu);
        return ApiResponse.<MenuResponse>builder()
                .data(response)
                .build();
    }

    @Override
    public ApiResponse<MenuResponse> updateMenu(Integer id, MenuRequest menuRequest) {
        Optional<MenuEntity> menu = menuRepository.findById(id);
        if (menu.isPresent()) {
            MenuEntity updatedMenu = menuMapper.updateMenuEntity(menu.get(), menuRequest);
            MenuEntity savedMenu = menuRepository.save(updatedMenu);
            MenuResponse response = menuMapper.toMenuResponse(savedMenu);
            return ApiResponse.<MenuResponse>builder()
                    .data(response)
                    .build();
        }
        return ApiResponse.<MenuResponse>builder()
                .message("Menu not found")
                .success(false)
                .code(404)
                .build();
    }

    @Override
    public ApiResponse<Void> deleteMenu(Integer id) {
        if (menuRepository.existsById(id)) {
            menuRepository.deleteById(id);
            return ApiResponse.<Void>builder().build();
        }
        return ApiResponse.<Void>builder()
                .message("Menu not found")
                .success(false)
                .code(404)
                .build();
    }
}
