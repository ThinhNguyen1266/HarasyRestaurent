package group5.swp.HarasyProject.dto.request.order;

import com.fasterxml.jackson.annotation.JsonInclude;
import group5.swp.HarasyProject.dto.request.account.QuickRegisCustomerRequest;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomerOrderRequest {
    Integer customerId;
    QuickRegisCustomerRequest newCustomer;
}
