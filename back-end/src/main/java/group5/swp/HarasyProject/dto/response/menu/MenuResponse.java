package group5.swp.HarasyProject.dto.response.menu;

import group5.swp.HarasyProject.enums.MenuType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MenuResponse {
    private Integer id;
    private MenuType type;
    private int branchId;
}
