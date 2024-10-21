package group5.swp.HarasyProject.dto.request.branch;

import com.fasterxml.jackson.annotation.JsonInclude;
import group5.swp.HarasyProject.dto.request.table.TableRequest;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateBranchRequest {
    String name;
    String location;
    String image;
    String phone;
    List<BranchWorkingHourRequest> workingHours;
    List<TableRequest> tables;
}
