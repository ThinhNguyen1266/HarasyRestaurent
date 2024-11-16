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
public class OrderItemInTimeResponse {
    Integer foodId;
    int quantity;
    OrderItemStatus status;
}
