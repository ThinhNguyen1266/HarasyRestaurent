package group5.swp.HarasyProject.mapper;

import group5.swp.HarasyProject.dto.request.menu.MenuRequest;
import group5.swp.HarasyProject.dto.response.menu.MenuResponse;
import group5.swp.HarasyProject.entity.menu.MenuEntity;
import group5.swp.HarasyProject.entity.branch.BranchEntity;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MenuMapper {

    // Mapping MenuEntity to MenuResponse
    @Mapping(target = "branchId", source = "menuEntity.branch.id")
    MenuResponse toMenuResponse(MenuEntity menuEntity);

    // Mapping a list of MenuEntity to a list of MenuResponse
    List<MenuResponse> toMenuResponseList(List<MenuEntity> menus);

    // Mapping MenuRequest to MenuEntity for creation
    @Mapping(target = "branch.id", source = "branchId")  // Maps branchId to branch.id
    @Mapping(target = "id", ignore = true)  // Ignore id since it's auto-generated
    @Mapping(target = "foods", ignore = true)  // Ignore foods if not included in the request
    MenuEntity toMenuEntity(MenuRequest menuRequest);

    // Mapping MenuRequest to MenuEntity for update
    @Mapping(target = "branch.id", source = "menuRequest.branchId")  // Maps branchId in MenuRequest to branch.id in MenuEntity
    @Mapping(target = "id", ignore = true)  // Ignore id during updates
    @Mapping(target = "foods", ignore = true)  // Ignore foods if not updating foods
    MenuEntity updateMenuEntity(@MappingTarget MenuEntity menuEntity, MenuRequest menuRequest);

    // Mapping MenuType explicitly to avoid ambiguity
    @Mapping(target = "type", source = "menuRequest.type")  // Explicitly map type from MenuRequest to MenuEntity
    void mapMenuType(MenuRequest menuRequest, @MappingTarget MenuEntity menuEntity);
}
