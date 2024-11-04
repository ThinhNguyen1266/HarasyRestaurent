package group5.swp.HarasyProject.mapper;

import group5.swp.HarasyProject.entity.food.FoodEntity;
import group5.swp.HarasyProject.entity.menu.MenuEntity;
import group5.swp.HarasyProject.entity.menu.MenuItemEntity;
import group5.swp.HarasyProject.entity.menu.MenuItemId;
import group5.swp.HarasyProject.enums.MenuItemStatus;
import org.mapstruct.Mapper;
import org.mapstruct.NullValueMappingStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring",
        nullValueMapMappingStrategy = NullValueMappingStrategy.RETURN_DEFAULT,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface MenuItemMapper {


    default MenuItemEntity toEntity(MenuEntity menu, FoodEntity food){
        return  MenuItemEntity.builder()
                .id(new MenuItemId(menu.getId(), food.getId()))
                .food(food)
                .menu(menu)
                .status(MenuItemStatus.AVAILABLE)
                .build();
    };

}
