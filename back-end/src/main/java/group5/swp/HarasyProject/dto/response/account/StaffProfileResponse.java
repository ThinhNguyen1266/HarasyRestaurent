package group5.swp.HarasyProject.dto.response.account;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import group5.swp.HarasyProject.entity.branch.BranchEntity;
import group5.swp.HarasyProject.enums.Account.StaffRole;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StaffProfileResponse implements ProfileResponse{
    Integer accountId;
    Integer id;
    String username;
    String email;
    String fullName;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    Date dob;
    String phone;


    StaffRole role;
    String bankAccount;
    String bankName;
    String picture;
    int salary;
    int branchId;
    String branchName;
}
