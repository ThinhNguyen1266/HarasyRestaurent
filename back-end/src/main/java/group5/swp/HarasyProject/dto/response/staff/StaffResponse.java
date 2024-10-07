package group5.swp.HarasyProject.dto.response.staff;

import group5.swp.HarasyProject.enums.Account.StaffRole;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StaffResponse {
    private String fullName;
    private String phone;
    private StaffRole role;
    private Integer  branch;
}
