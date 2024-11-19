package group5.swp.HarasyProject.dto.response.order;

import com.fasterxml.jackson.annotation.JsonInclude;
import group5.swp.HarasyProject.enums.OrderItemStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderItemResponse {
    Integer foodId;
    String name;
    int quantity;
    OrderItemStatus status;
    int cooked;
    int pointsPrice;
    int price;
    long total;
}
