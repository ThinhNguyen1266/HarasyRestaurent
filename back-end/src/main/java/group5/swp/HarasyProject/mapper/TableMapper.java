package group5.swp.HarasyProject.mapper;

import group5.swp.HarasyProject.dto.request.table.TableRequest;
import group5.swp.HarasyProject.dto.response.table.TableResponse;
import group5.swp.HarasyProject.entity.branch.TableEntity;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring",
nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface TableMapper {


    @Mapping(target = "status" , constant = "UNAVAILABLE")
    TableEntity toTable(TableRequest requests);

    @Mapping(target = "status" , constant = "AVAILABLE")
    List<TableEntity> toTables(List<TableRequest> requests);

    TableResponse toResponse(TableEntity entity);

    TableEntity updateTable(TableRequest request,@MappingTarget TableEntity target);

}
