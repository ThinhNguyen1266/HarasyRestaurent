package group5.swp.HarasyProject.mapper;

import group5.swp.HarasyProject.dto.request.table.CreateTableRequest;
import group5.swp.HarasyProject.entity.branch.TableEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.Set;

@Mapper(componentModel = "spring")
public interface TableMapper {
    @Mapping(target = "status",constant = "UNAVAILABLE")
   TableEntity toTable(CreateTableRequest requests);
}
