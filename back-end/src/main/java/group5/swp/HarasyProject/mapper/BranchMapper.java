package group5.swp.HarasyProject.mapper;

import group5.swp.HarasyProject.dto.request.branch.BranchInfoRequest;
import group5.swp.HarasyProject.dto.response.branch.BranchInfoHomeResponse;
import group5.swp.HarasyProject.dto.response.branch.BranchResponse;
import group5.swp.HarasyProject.dto.response.branch.BranchesViewResponse;
import group5.swp.HarasyProject.entity.branch.BranchEntity;
import group5.swp.HarasyProject.entity.branch.TableEntity;
import group5.swp.HarasyProject.entity.menu.MenuEntity;
import org.mapstruct.*;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring",
        nullValueMapMappingStrategy = NullValueMappingStrategy.RETURN_DEFAULT,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface BranchMapper {

    
    @Mapping(target = "branchInfo.id" ,source = "branch.id")
    @Mapping(target = "branchInfo.name" ,source = "branch.name")
    @Mapping(target = "branchInfo.image" ,source = "branch.image")
    @Mapping(target = "branchInfo.location" ,source = "branch.location")
    @Mapping(target = "branchInfo.phone" ,source = "branch.phone")
    @Mapping(target = "branchInfo.status" ,source = "branch.status")
    @Mapping(target = "branchInfo.workingHours" ,source = "branch.workingHours")
    BranchResponse toBranchResponse(BranchEntity branch);

    List<BranchResponse> toBranchInfoResponses(List<BranchEntity> branches);

    @Mapping(target = "status", constant = "INACTIVE")
    BranchEntity toBranchEntity(BranchInfoRequest request);
    BranchEntity updateEntity(BranchInfoRequest request, @MappingTarget BranchEntity branch);



    List<BranchesViewResponse> toBranchesViewResponse(List<BranchEntity> branches);
    BranchInfoHomeResponse toBranchInfoHomeResponse(BranchEntity branch);


    default void addTables(TableEntity table, @MappingTarget BranchEntity branch){
        if (branch.getTables() == null) {
            branch.setTables(new ArrayList<>());
        }
        table.setBranch(branch);
        branch.getTables().add(table);
    };

    default void addMenus(MenuEntity menu, @MappingTarget BranchEntity branch){
        if (branch.getMenus() == null) {
            branch.setMenus(new ArrayList<>());
        }
        menu.setBranch(branch);
        branch.getMenus().add(menu);
    }
}
