package group5.swp.HarasyProject.dto.request.menu;

import group5.swp.HarasyProject.enums.MenuType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MenuRequest {
    MenuType type;
    Integer branchId;
}
