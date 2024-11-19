package group5.swp.HarasyProject.dto.request.account;

import com.fasterxml.jackson.annotation.JsonInclude;
import group5.swp.HarasyProject.enums.Account.StaffRole;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RegistStaffRequest {
    String username;
    String password;
    String email;
    String fullName;
    String phone;
    Date dob;
    int branchId;
    StaffRole role;
    String bankName;
    String bankAccount;
    String picture;
    int salary;
}
