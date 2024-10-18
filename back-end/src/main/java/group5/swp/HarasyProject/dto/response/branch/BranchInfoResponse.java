package group5.swp.HarasyProject.dto.response.branch;

import com.fasterxml.jackson.annotation.JsonInclude;
import group5.swp.HarasyProject.dto.response.table.TableResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.Set;

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
    List<BranchWorkingHourResponse> workingHours;
    List<TableResponse> tables;
}
