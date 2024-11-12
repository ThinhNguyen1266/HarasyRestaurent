package group5.swp.HarasyProject.dto.request.branch;

import com.fasterxml.jackson.annotation.JsonInclude;
import group5.swp.HarasyProject.dto.request.GenericSubPropertiesRequest;
import group5.swp.HarasyProject.dto.request.menu.MenuRequest;
import group5.swp.HarasyProject.dto.request.table.TableRequest;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BranchRequest {
    BranchInfoRequest branchInfo;
    GenericSubPropertiesRequest<BranchWorkingHourRequest> workingHours;
    GenericSubPropertiesRequest<TableRequest> tables;
    GenericSubPropertiesRequest<MenuRequest> menus;
}
