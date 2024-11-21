package group5.swp.HarasyProject.mapper;

import group5.swp.HarasyProject.dto.request.menu.MenuRequest;
import group5.swp.HarasyProject.dto.response.menu.MenuResponse;
import group5.swp.HarasyProject.entity.menu.MenuEntity;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring",
        nullValueMapMappingStrategy = NullValueMappingStrategy.RETURN_DEFAULT,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
        , uses = {MenuItemMapper.class})
public interface MenuMapper {

    @Mapping(target = "branchId", source = "branch.id")
    MenuResponse toMenuResponse(MenuEntity menu);


    @Mapping(target = "status", constant = "UNAVAILABLE")
    MenuEntity toMenuEntity(MenuRequest requests);

    MenuEntity updateMenu(MenuRequest requests, @MappingTarget MenuEntity menuEntity);

    @Mapping(target = "status", constant = "UNAVAILABLE")
    List<MenuEntity> toMenuEntities(List<MenuRequest> requests);

}
