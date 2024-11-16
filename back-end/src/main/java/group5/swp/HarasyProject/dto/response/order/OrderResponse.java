package group5.swp.HarasyProject.dto.response.order;

import com.fasterxml.jackson.annotation.JsonInclude;
import group5.swp.HarasyProject.dto.response.account.AccountMinimalResponse;
import group5.swp.HarasyProject.dto.response.branch.BranchMinimalResponse;
import group5.swp.HarasyProject.dto.response.table.TableMinimalResponse;
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
public class OrderResponse {
    Integer id;
    PaymentStatus paymentStatus;
    List<TableMinimalResponse> tables;
    BranchMinimalResponse branch;
    AccountMinimalResponse staff;
    AccountMinimalResponse customer;
    List<OrderItemResponse> orderItems;
    Long total;
    Date orderDate;
    String note;
}
