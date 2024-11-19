package group5.swp.HarasyProject.dto.request.reservation;

import com.fasterxml.jackson.annotation.JsonInclude;
import group5.swp.HarasyProject.dto.request.order.CustomerOrderRequest;
import group5.swp.HarasyProject.dto.request.order.OrderRequest;
import group5.swp.HarasyProject.enums.ReservationStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReservationRequest {
    int branchId;
    CustomerOrderRequest customer;
    List<Integer> tableIds;
    LocalDate date;
    LocalTime time;
    ReservationStatus status;
    int typeId;
    int amountGuest;
    OrderRequest order;
}
