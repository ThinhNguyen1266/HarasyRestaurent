package group5.swp.HarasyProject.dto.request.order;

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
public class OrderItemRequest {
    Integer foodId;
    Integer quantity;
    OrderItemStatus status;
    Integer cooked;
}
