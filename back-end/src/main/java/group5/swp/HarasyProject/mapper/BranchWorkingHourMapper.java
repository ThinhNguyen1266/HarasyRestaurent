package group5.swp.HarasyProject.mapper;

import group5.swp.HarasyProject.dto.request.branch.BranchWorkingHourRequest;
import group5.swp.HarasyProject.dto.response.branch.BranchWorkingHourResponse;
import group5.swp.HarasyProject.entity.branch.BranchWorkingHourEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;



@Mapper(componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface BranchWorkingHourMapper {
    BranchWorkingHourResponse toResponse(BranchWorkingHourEntity entity);

    BranchWorkingHourEntity toEntity(BranchWorkingHourRequest request);

    BranchWorkingHourEntity updateEntity(BranchWorkingHourRequest request, @MappingTarget BranchWorkingHourEntity entity);
}
