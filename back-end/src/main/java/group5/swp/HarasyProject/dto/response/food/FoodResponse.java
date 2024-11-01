package group5.swp.HarasyProject.dto.response.food;

import com.fasterxml.jackson.annotation.JsonInclude;
import group5.swp.HarasyProject.enums.Status;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FoodResponse {
    Integer id;
    String name;
    String description;
    String image;
    Integer price;
    Integer pointsPrice;
    String status;
    String categoryName;
}
