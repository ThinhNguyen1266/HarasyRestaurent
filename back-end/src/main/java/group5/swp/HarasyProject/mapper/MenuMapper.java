package group5.swp.HarasyProject.mapper;

import group5.swp.HarasyProject.dto.request.menu.MenuRequest;
import group5.swp.HarasyProject.dto.response.menu.MenuResponse;
import group5.swp.HarasyProject.entity.menu.MenuEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring" ,uses = {FoodMapper.class})
public interface MenuMapper {

    @Mapping(target = "branchId", source = "menu.branch.id")
    @Mapping(target = "foods", source = "menu.menuItems")
    MenuResponse toMenuResponse(MenuEntity menu);


    @Mapping(target = "status", constant = "UNAVAILABLE")
    MenuEntity toMenuEntity(MenuRequest requests);

    MenuEntity updateMenu(MenuRequest requests, @MappingTarget MenuEntity menuEntity);

    @Mapping(target = "status", constant = "UNAVAILABLE")
    List<MenuEntity> toMenuEntities(List<MenuRequest> requests);

}
