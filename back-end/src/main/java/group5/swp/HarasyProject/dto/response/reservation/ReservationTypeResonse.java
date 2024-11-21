package group5.swp.HarasyProject.dto.response.reservation;

import com.fasterxml.jackson.annotation.JsonInclude;
import group5.swp.HarasyProject.enums.ReservationType;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReservationTypeResonse {
    int id;
    long minPrice;
    ReservationType name;
}
