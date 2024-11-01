package group5.swp.HarasyProject.mapper;

import group5.swp.HarasyProject.dto.request.categorys.CategoryRequest;
import group5.swp.HarasyProject.dto.response.category.CategoryResponse;
import group5.swp.HarasyProject.entity.food.CategoryEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValueMappingStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring",
        nullValueMapMappingStrategy = NullValueMappingStrategy.RETURN_DEFAULT,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface CategoryMapper {


    CategoryResponse toResponse(CategoryEntity category);

    CategoryEntity toEntity(CategoryRequest categoryResponse);


}
