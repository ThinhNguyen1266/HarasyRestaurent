package group5.swp.HarasyProject.mapper;

import group5.swp.HarasyProject.dto.response.staff.StaffResponse;
import group5.swp.HarasyProject.entity.account.StaffAccountEntity;
import org.springframework.stereotype.Component;

@Component
public class StaffMapper {

    public StaffResponse toResponse(StaffAccountEntity staff) {
        if (staff == null) {
            return null;
        }
        return StaffResponse.builder()
                .fullName(staff.getAccount().getFullName())
                .phone(staff.getAccount().getPhone())
                .role(staff.getRole())
                .branch(staff.getBranch() != null ? staff.getBranch().getId() : null)
                .build();
    }
}
