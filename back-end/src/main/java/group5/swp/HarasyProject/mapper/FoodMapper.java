package group5.swp.HarasyProject.mapper;

import group5.swp.HarasyProject.dto.request.food.FoodRequest;
import group5.swp.HarasyProject.dto.response.food.FoodResponse;
import group5.swp.HarasyProject.entity.food.FoodEntity;
import group5.swp.HarasyProject.entity.menu.MenuItemEntity;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring",
        nullValueMapMappingStrategy = NullValueMappingStrategy.RETURN_DEFAULT,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface FoodMapper {

    @Mapping(target = "categoryName" , source = "food.category.name")
    FoodResponse toResponse(FoodEntity food);

    @Mapping(target = "status", constant = "INACTIVE")
    FoodEntity toEntity(FoodRequest foodRequest);

    @Mapping(target = "id", source = "food.id")
    @Mapping(target = "name", source = "food.name")
    @Mapping(target = "price", source = "food.price")
    FoodResponse itemToFoodResponse(MenuItemEntity menuItemEntity);

    FoodEntity updateFood( FoodRequest request ,@MappingTarget FoodEntity food);


    default List<FoodResponse> itemsToFoodResponseList(List<MenuItemEntity> menuItemEntity){
        return menuItemEntity.stream().map(this::itemToFoodResponse).toList();
    };
}
