package group5.swp.HarasyProject.mapper;

import group5.swp.HarasyProject.dto.request.branch.CreateBranchRequest;
import group5.swp.HarasyProject.dto.response.branch.BranchInfoResponse;
import group5.swp.HarasyProject.dto.response.branch.BranchListResponse;
import group5.swp.HarasyProject.entity.branch.BranchEntity;
import org.mapstruct.*;


import java.util.List;
import java.util.Set;

@Mapper(componentModel = "spring",nullValueMapMappingStrategy = NullValueMappingStrategy.RETURN_DEFAULT, nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface BranchMapper {

    Set<BranchListResponse> toBranchListResponse(Set<BranchEntity> branches);
    BranchInfoResponse toBranchInfoResponse(BranchEntity branch);

    @Mapping(target = "status",constant = "INACTIVE")
    BranchEntity toBranchEntity(CreateBranchRequest request);
}
