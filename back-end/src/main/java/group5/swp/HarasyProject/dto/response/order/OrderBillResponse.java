package group5.swp.HarasyProject.dto.response.order;

import com.fasterxml.jackson.annotation.JsonInclude;
import group5.swp.HarasyProject.dto.response.account.AccountMinimalResponse;
import group5.swp.HarasyProject.enums.PaymentStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderBillResponse {
    Integer id;
    PaymentStatus status;
    List<Integer> tableIds;
    AccountMinimalResponse staff;
    AccountMinimalResponse customer;
    List<OrderItemBillResponse> orderItems;
    Long total;
    Date orderDate;
}
