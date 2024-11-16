package group5.swp.HarasyProject.mapper;

import group5.swp.HarasyProject.dto.request.account.RegisCustomerRequest;
import group5.swp.HarasyProject.dto.request.account.RegistStaffRequest;
import group5.swp.HarasyProject.dto.response.account.CustomerProfileResponse;
import group5.swp.HarasyProject.dto.response.account.ProfileResponse;
import group5.swp.HarasyProject.dto.response.account.StaffProfileResponse;
import group5.swp.HarasyProject.entity.account.AccountEntity;
import group5.swp.HarasyProject.entity.account.StaffAccountEntity;
import org.mapstruct.*;


@Mapper(componentModel = "spring",nullValueMapMappingStrategy = NullValueMappingStrategy.RETURN_DEFAULT, nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface AccountMapper {
    @Mapping(target = "status", constant = "PENDING")
    AccountEntity regisCusToAccount(RegisCustomerRequest regisCustomerRequest);
    @Mapping(target = "status", constant = "ACTIVE")
    AccountEntity staffRequestToAccount(RegistStaffRequest registStaffRequest);
//    @Mapping(target = "branchId", ignore = true)
    StaffAccountEntity staffRequestToStaffAccount(RegistStaffRequest registStaffRequest);

    @Mapping(target = "role",source = "account.staff.role")
    @Mapping(target = "bankAccount",source = "account.staff.bankAccount")
    @Mapping(target = "bankName",source = "account.staff.bankName")
    @Mapping(target = "salary",source = "account.staff.salary")
    @Mapping(target = "branchName",source = "account.staff.branch.name")
    @Mapping(target = "branchId" ,source = "account.staff.branch.id")
    StaffProfileResponse toStaffProfileResponse(AccountEntity account);
    @Mapping(target = "vipPoint", source = "account.customer.vipPoint")
    CustomerProfileResponse toCustomerProfileResponse(AccountEntity account);

}
