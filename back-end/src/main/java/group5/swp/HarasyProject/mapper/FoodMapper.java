package group5.swp.HarasyProject.mapper;

import group5.swp.HarasyProject.dto.request.food.FoodRequest;
import group5.swp.HarasyProject.dto.response.food.FoodResponse;
import group5.swp.HarasyProject.entity.food.FoodEntity;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring",
        nullValueMapMappingStrategy = NullValueMappingStrategy.RETURN_DEFAULT,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface FoodMapper {

    @Mapping(target = "categoryName" , source = "food.category.name")
    FoodResponse toResponse(FoodEntity food);

    FoodEntity toEntity(FoodRequest foodRequest, @MappingTarget FoodEntity food);

}
