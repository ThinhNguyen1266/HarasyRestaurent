package group5.swp.HarasyProject.dto.request.branch;

import com.fasterxml.jackson.annotation.JsonInclude;
import group5.swp.HarasyProject.enums.Status;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BranchInfoRequest {
    String name;
    String location;
    String image;
    String phone;
    Status status;
    Integer managerId;
}
