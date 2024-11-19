package group5.swp.HarasyProject.dto.response.reservation;


import com.fasterxml.jackson.annotation.JsonInclude;
import group5.swp.HarasyProject.dto.response.account.AccountMinimalResponse;
import group5.swp.HarasyProject.dto.response.branch.BranchMinimalResponse;
import group5.swp.HarasyProject.dto.response.order.OrderResponse;
import group5.swp.HarasyProject.enums.ReservationStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReservationResponse {
    Integer id;
    LocalDate date;
    LocalTime time;
    int amountGuest;
    ReservationStatus status;
    AccountMinimalResponse customer;
    BranchMinimalResponse branch;
    OrderResponse order;
    String type;
}
