package group5.swp.HarasyProject.mapper;

import group5.swp.HarasyProject.dto.response.menu.MenuItemResponse;
import group5.swp.HarasyProject.entity.food.FoodEntity;
import group5.swp.HarasyProject.entity.menu.MenuEntity;
import group5.swp.HarasyProject.entity.menu.MenuItemEntity;
import group5.swp.HarasyProject.entity.menu.MenuItemId;
import group5.swp.HarasyProject.enums.BinaryStatus;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValueMappingStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring",
        nullValueMapMappingStrategy = NullValueMappingStrategy.RETURN_DEFAULT,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface MenuItemMapper {


    @Mapping(target = "foodId" , source = "food.id")
    @Mapping(target = "name" , source = "food.name")
    @Mapping(target = "description" , source = "food.description")
    @Mapping(target = "image" , source = "food.image")
    @Mapping(target = "price" , source = "food.price")
    @Mapping(target = "pointsPrice" , source = "food.pointsPrice")
    @Mapping(target = "categoryName" , source = "food.category.name")
    MenuItemResponse toResponse(MenuItemEntity menuItemEntity);


    default MenuItemEntity toEntity(MenuEntity menu, FoodEntity food){
        return  MenuItemEntity.builder()
                .id(new MenuItemId(menu.getId(), food.getId()))
                .food(food)
                .menu(menu)
                .status(BinaryStatus.AVAILABLE)
                .build();
    };

}
