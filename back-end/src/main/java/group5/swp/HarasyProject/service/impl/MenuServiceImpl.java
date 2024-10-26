package group5.swp.HarasyProject.service.impl;

import group5.swp.HarasyProject.dto.request.menu.MenuRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.menu.MenuResponse;
import group5.swp.HarasyProject.entity.menu.MenuEntity;
import group5.swp.HarasyProject.enums.ErrorCode;
import group5.swp.HarasyProject.exception.AppException;
import group5.swp.HarasyProject.mapper.MenuMapper;
import group5.swp.HarasyProject.repository.MenuRepository;
import group5.swp.HarasyProject.service.MenuService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@RequiredArgsConstructor
public class MenuServiceImpl implements MenuService {

    MenuRepository menuRepository;
    MenuMapper menuMapper;


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
}
