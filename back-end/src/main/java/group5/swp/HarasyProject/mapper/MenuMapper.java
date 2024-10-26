package group5.swp.HarasyProject.mapper;

import group5.swp.HarasyProject.dto.request.menu.MenuRequest;
import group5.swp.HarasyProject.dto.response.menu.MenuResponse;
import group5.swp.HarasyProject.entity.menu.MenuEntity;
import group5.swp.HarasyProject.entity.branch.BranchEntity;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MenuMapper {

    @Mapping(target = "branchId", source = "menuEntity.branch.id")
    MenuResponse toMenuResponse(MenuEntity menuEntity);


    MenuEntity toMenuEntity(MenuRequest menuRequest);

    MenuEntity updateMenu(MenuRequest menuRequest, @MappingTarget MenuEntity menuEntity);


    List<MenuEntity> toMenuEntities(List<MenuRequest> menuRequests);

}
