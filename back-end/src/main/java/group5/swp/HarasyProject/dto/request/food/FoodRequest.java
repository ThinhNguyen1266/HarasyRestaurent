package group5.swp.HarasyProject.dto.request.food;

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
public class FoodRequest {
    String name;
    String description;
    String image;
    Status status;
    Integer price;
    Integer pointsPrice;
    Integer categoryId;
}
