package group5.swp.HarasyProject.mapper;

import group5.swp.HarasyProject.dto.request.table.TableRequest;
import group5.swp.HarasyProject.dto.response.table.TableResponse;
import group5.swp.HarasyProject.entity.branch.TableEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring",
nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface TableMapper {
    TableEntity toTable(TableRequest requests, @MappingTarget TableEntity tableEntity);

    TableResponse toResponse(TableEntity entity);

    List<TableResponse> toSetResponse(List<TableEntity> entities);

}
