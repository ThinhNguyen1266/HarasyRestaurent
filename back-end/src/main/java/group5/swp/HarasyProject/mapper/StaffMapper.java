package group5.swp.HarasyProject.mapper;

import group5.swp.HarasyProject.dto.response.staff.StaffResponse;
import group5.swp.HarasyProject.entity.account.StaffAccountEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring") // Enables Spring's dependency injection
public interface StaffMapper {

    @Mapping(target = "fullName", source = "account.fullName")
    @Mapping(target = "phone", source = "account.phone")
    @Mapping(target = "role", source = "role")
    @Mapping(target = "branchName", source = "branch.name")
    StaffResponse toResponse(StaffAccountEntity staff);
}
