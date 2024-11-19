package group5.swp.HarasyProject.dto.response.branch;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.DayOfWeek;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BranchWorkingHourResponse {
    int id;
    DayOfWeek dayOfWeek;
    LocalTime openingTime;
    LocalTime closingTime;
}
