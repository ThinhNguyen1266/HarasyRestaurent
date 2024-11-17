package group5.swp.HarasyProject.dto.request.staff;

import com.fasterxml.jackson.annotation.JsonInclude;
import group5.swp.HarasyProject.entity.account.AccountEntity;
import group5.swp.HarasyProject.entity.branch.BranchEntity;
import group5.swp.HarasyProject.entity.order.OrderEntity;
import group5.swp.HarasyProject.enums.Account.StaffRole;
import group5.swp.HarasyProject.enums.MenuType;
import group5.swp.HarasyProject.enums.Status;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StaffRequest {
    StaffRole role;
        int branchId;
        String bankName;
        String bankAccount;
        String picture;
        int salary;
        Status status;
}