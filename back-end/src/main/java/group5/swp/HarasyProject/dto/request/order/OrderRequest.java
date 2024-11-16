package group5.swp.HarasyProject.dto.request.order;

import com.fasterxml.jackson.annotation.JsonInclude;
import group5.swp.HarasyProject.dto.request.GenericSubPropertiesRequest;
import group5.swp.HarasyProject.enums.PaymentStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderRequest {
    Integer branchId;
    List<Integer> tableIds;
    PaymentStatus paymentStatus;
    Integer staffId;
    CustomerOrderRequest customer;
    GenericSubPropertiesRequest<OrderItemRequest> orderItems;
    String note;
}
