package group5.swp.HarasyProject.mapper;

import group5.swp.HarasyProject.dto.request.staff.StaffRequest;
import group5.swp.HarasyProject.dto.response.staff.StaffResponse;
import group5.swp.HarasyProject.entity.account.StaffAccountEntity;
import group5.swp.HarasyProject.entity.branch.BranchEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring") // Enables Spring's dependency injection
public interface StaffMapper {
    @Mapping(target = "fullName", source = "account.fullName")
    @Mapping(target = "phone", source = "account.phone")
    @Mapping(target = "branchId", source = "branch.id")
    @Mapping(target = "branchName", source = "branch.name")
    @Mapping(target = "email",source = "account.email")
    @Mapping(target = "status",source = "account.status")
    StaffResponse toResponse(StaffAccountEntity staff);

    @Mapping(target = "id", ignore = true)  // Ignore the id field during mapping
    @Mapping(target = "branch", ignore = true)
    StaffAccountEntity updateStaffInfo(StaffRequest staff,  @MappingTarget StaffAccountEntity staffAccount);
}
