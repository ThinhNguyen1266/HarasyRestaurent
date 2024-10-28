package group5.swp.HarasyProject.mapper;

import group5.swp.HarasyProject.dto.request.branch.CreateBranchRequest;
import group5.swp.HarasyProject.dto.request.branch.UpdateBranchRequest;
import group5.swp.HarasyProject.dto.response.branch.BranchInfoResponse;
import group5.swp.HarasyProject.dto.response.branch.BranchListResponse;
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

    List<BranchListResponse> toBranchListResponse(List<BranchEntity> branches);
    BranchInfoResponse toBranchInfoResponse(BranchEntity branch);

    List<BranchInfoResponse> toBranchInfoResponses(List<BranchEntity> branches);

    @Mapping(target = "status", ignore = true)
    BranchEntity toBranchEntity(CreateBranchRequest request, @MappingTarget BranchEntity branch);

    BranchEntity updateEntity(UpdateBranchRequest request, @MappingTarget BranchEntity branch);

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
