package group5.swp.HarasyProject.dto.response.reservation;



import com.fasterxml.jackson.annotation.JsonInclude;
import group5.swp.HarasyProject.enums.ReservationStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReservationResponse {
    Integer id;
    Timestamp reservationDate;
    int amountGuest;
    ReservationStatus status; // Can use ReservationStatus Enum if preferred
    String customerName; // Add fields as needed, e.g., customer name
    String branchName; // Add fields for related branch info
}
