package group5.swp.HarasyProject.dto.response.branch;

import com.fasterxml.jackson.annotation.JsonInclude;
import group5.swp.HarasyProject.dto.response.table.TableResponse;
import group5.swp.HarasyProject.enums.Status;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BranchInfoResponse {
    Integer id;
    String name;
    String location;
    String image;
    String phone;
    Status status;
    String managerName;
    List<BranchWorkingHourResponse> workingHours;
    List<TableResponse> tables;
}
