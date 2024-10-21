package group5.swp.HarasyProject.dto.response.table;

import com.fasterxml.jackson.annotation.JsonInclude;
import group5.swp.HarasyProject.entity.branch.BranchEntity;
import group5.swp.HarasyProject.enums.Status;
import group5.swp.HarasyProject.enums.TableStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TableResponse {
    Integer id;
    int number;
    TableStatus status;
    int capacity;
    Integer branchId;
}
