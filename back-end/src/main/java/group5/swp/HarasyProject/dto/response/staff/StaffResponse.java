package group5.swp.HarasyProject.dto.response.staff;

import group5.swp.HarasyProject.enums.Account.StaffRole;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StaffResponse {
    private int id;
    private String fullName;
    private String phone;
    private StaffRole role;
    private int branchId;
    private String branchName;
    private String bankName;
    private String bankAccount;
    private String email;
    private String picture;
    private int salary;
    private String status;
}
