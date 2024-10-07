package group5.swp.HarasyProject.mapper;

import group5.swp.HarasyProject.dto.request.menu.MenuRequest;
import group5.swp.HarasyProject.dto.request.table.TableRequest;
import group5.swp.HarasyProject.dto.response.menu.MenuResponse;
import group5.swp.HarasyProject.dto.response.table.TableResponse;
import group5.swp.HarasyProject.entity.branch.TableEntity;
import group5.swp.HarasyProject.entity.menu.MenuEntity;
import group5.swp.HarasyProject.enums.TableStatus;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TableMapper {
    TableMapper INSTANCE = Mappers.getMapper(TableMapper.class);

    // Mapping TableEntity to TableResponse
    @Mapping(target = "branchId", source = "tableEntity.branch.id")
    @Mapping(target = "status", source = "tableEntity.status", defaultExpression = "java(group5.swp.HarasyProject.enums.TableStatus.AVAILABLE)")
    TableResponse toTableResponse(TableEntity tableEntity);

    // Mapping a list of TableEntity to a list of TableResponse
    List<TableResponse> toTableResponseList(List<TableEntity> tables);

    // Mapping a list of TableResponse to a list of TableEntity
    @Mapping(target = "status", source = "tableResponses.status", defaultExpression = "java(group5.swp.HarasyProject.enums.TableStatus.AVAILABLE)")
    List<TableEntity> toTableEntityList(List<TableResponse> tableResponses);

    // Mapping MenuRequest to MenuEntity for creation
    @Mapping(target = "branch.id", source = "branchId")  // Maps branchId to branch.id
    @Mapping(target = "id", ignore = true)  // Ignore id since it's auto-generated
    @Mapping(target = "status", source = "tableRequest.status", defaultExpression = "java(group5.swp.HarasyProject.enums.TableStatus.AVAILABLE)")
    TableEntity toTableEntity(TableRequest tableRequest);

    // Mapping MenuRequest to MenuEntity for update
    @Mapping(target = "branch.id", ignore = true)  // Maps branchId in MenuRequest to branch.id in MenuEntity
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "status", source = "tableRequest.status", defaultExpression = "java(group5.swp.HarasyProject.enums.TableStatus.AVAILABLE)")// Ignore id during updates
    TableEntity updateTableEntity(@MappingTarget TableEntity tableEntity, TableRequest tableRequest);

    default void markTableAsDeleted(@MappingTarget TableEntity tableEntity) {
        tableEntity.setStatus(TableStatus.DELETED); // Set the status to DELETED
    }

}
