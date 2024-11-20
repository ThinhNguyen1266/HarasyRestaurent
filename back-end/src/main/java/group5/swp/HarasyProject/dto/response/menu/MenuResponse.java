package group5.swp.HarasyProject.dto.response.menu;

import com.fasterxml.jackson.annotation.JsonInclude;
import group5.swp.HarasyProject.enums.BinaryStatus;
import group5.swp.HarasyProject.enums.MenuType;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MenuResponse {
    Integer id;
    MenuType type;
    BinaryStatus status;
    int branchId;
    List<MenuItemResponse> menuItems;
}
