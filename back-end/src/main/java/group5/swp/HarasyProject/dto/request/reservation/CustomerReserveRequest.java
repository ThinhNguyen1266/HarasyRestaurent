package group5.swp.HarasyProject.dto.request.reservation;


import com.fasterxml.jackson.annotation.JsonInclude;
import group5.swp.HarasyProject.dto.request.order.CustomerOrderRequest;
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
public class CustomerReserveRequest {
    int branchId;
    CustomerOrderRequest customer;
    LocalDate date;
    LocalTime time;
    int amountGuest;
    int typeId;
    ReservationStatus status;
}
