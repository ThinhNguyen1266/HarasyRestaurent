package group5.swp.HarasyProject.service.impl;

import group5.swp.HarasyProject.dto.request.categorys.CategoryRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.category.CategoryResponse;
import group5.swp.HarasyProject.entity.food.CategoryEntity;
import group5.swp.HarasyProject.enums.ErrorCode;
import group5.swp.HarasyProject.exception.AppException;
import group5.swp.HarasyProject.mapper.CategoryMapper;
import group5.swp.HarasyProject.repository.CategoryRepository;
import group5.swp.HarasyProject.service.CategoryService;
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
public class CategoryServiceImpl implements CategoryService {

    CategoryRepository categoryRepository;
    CategoryMapper categoryMapper;

    @Override
    public ApiResponse<List<CategoryResponse>> getAllCategories() {
        List<CategoryEntity> categoryEntities = categoryRepository.findAll();
        List<CategoryResponse> categoryResponses = categoryEntities
                .stream().map(categoryMapper::toResponse)
                .toList();
        return ApiResponse.<List<CategoryResponse>>builder()
                .data(categoryResponses)
                .build();
    }

    @Override
    public ApiResponse<CategoryResponse> getCategoryById(int id) {
        CategoryEntity categoryEntity = categoryRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ENTITY_NOT_FOUND));
        CategoryResponse categoryResponse = categoryMapper.toResponse(categoryEntity);
        return ApiResponse.<CategoryResponse>builder()
                .data(categoryResponse)
                .build();
    }


}
