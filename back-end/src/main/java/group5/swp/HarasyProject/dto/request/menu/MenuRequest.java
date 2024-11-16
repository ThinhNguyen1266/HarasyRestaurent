package group5.swp.HarasyProject.dto.request.menu;

import com.fasterxml.jackson.annotation.JsonInclude;
import group5.swp.HarasyProject.enums.BinaryStatus;
import group5.swp.HarasyProject.enums.MenuType;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MenuRequest {
    Integer id;
    MenuType type;
    BinaryStatus status;
}
