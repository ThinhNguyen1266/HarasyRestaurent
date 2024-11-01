package group5.swp.HarasyProject.service;


import com.cloudinary.Api;
import group5.swp.HarasyProject.dto.request.categorys.CategoryRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.category.CategoryResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CategoryService {
    ApiResponse<List<CategoryResponse>> getAllCategories();
    ApiResponse<CategoryResponse> getCategoryById(int id);
}
