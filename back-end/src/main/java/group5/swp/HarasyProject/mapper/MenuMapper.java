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

    MenuEntity toMenuEntity(MenuRequest menuRequest);

    MenuEntity updateMenu(MenuRequest menuRequest, @MappingTarget MenuEntity menuEntity);
    List<MenuEntity> toMenuEntities(List<MenuRequest> menuRequests);

}
