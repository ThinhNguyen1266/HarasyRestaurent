package group5.swp.HarasyProject.mapper;

import group5.swp.HarasyProject.dto.request.branch.BranchInfoRequest;
import group5.swp.HarasyProject.dto.response.branch.BranchInfoHomeResponse;
import group5.swp.HarasyProject.dto.response.branch.BranchResponse;
import group5.swp.HarasyProject.dto.response.branch.BranchesViewResponse;
import group5.swp.HarasyProject.entity.branch.BranchEntity;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring",
        nullValueMapMappingStrategy = NullValueMappingStrategy.RETURN_DEFAULT,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface BranchMapper {

    
    @Mapping(target = "branchInfo.id" ,source = "id")
    @Mapping(target = "branchInfo.name" ,source = "name")
    @Mapping(target = "branchInfo.image" ,source = "image")
    @Mapping(target = "branchInfo.location" ,source = "location")
    @Mapping(target = "branchInfo.phone" ,source = "phone")
    @Mapping(target = "branchInfo.status" ,source = "status")
    @Mapping(target = "branchInfo.workingHours" ,source = "workingHours")
    BranchResponse toBranchResponse(BranchEntity branch);

    List<BranchResponse> toBranchInfoResponses(List<BranchEntity> branches);

    @Mapping(target = "status", constant = "INACTIVE")
    BranchEntity toBranchEntity(BranchInfoRequest request);
    BranchEntity updateEntity(BranchInfoRequest request, @MappingTarget BranchEntity branch);



    List<BranchesViewResponse> toBranchesViewResponse(List<BranchEntity> branches);
    BranchInfoHomeResponse toBranchInfoHomeResponse(BranchEntity branch);



}
