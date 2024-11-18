    package group5.swp.HarasyProject.dto.request.branch;

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
    public class BranchWorkingHourRequest {
        DayOfWeek dayOfWeek;
        LocalTime openingTime;
        LocalTime closingTime;
    }
