package group5.swp.HarasyProject.mapper;

import group5.swp.HarasyProject.dto.request.branch.CreateBranchRequest;
import group5.swp.HarasyProject.dto.request.branch.UpdateBranchRequest;
import group5.swp.HarasyProject.dto.response.branch.BranchInfoResponse;
import group5.swp.HarasyProject.dto.response.branch.BranchListResponse;
import group5.swp.HarasyProject.entity.branch.BranchEntity;
import org.mapstruct.*;

import java.util.Set;

@Mapper(componentModel = "spring",nullValueMapMappingStrategy = NullValueMappingStrategy.RETURN_DEFAULT, nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface BranchMapper {

    Set<BranchListResponse> toBranchListResponse(Set<BranchEntity> branches);
    BranchInfoResponse toBranchInfoResponse(BranchEntity branch);

    @Mapping(target = "status", ignore = true)
    BranchEntity toBranchEntity(CreateBranchRequest request, @MappingTarget BranchEntity branch);

    BranchEntity updateEntity(UpdateBranchRequest request, @MappingTarget BranchEntity branch);
}
