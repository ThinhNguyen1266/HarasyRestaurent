package group5.swp.HarasyProject.dto.response.menu;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MenuItemResponse {
    Integer foodId;
    String name;
    String description;
    String image;
    Integer price;
    Integer pointsPrice;
    String status;
    String categoryName;
}
