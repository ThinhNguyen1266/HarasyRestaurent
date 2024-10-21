package group5.swp.HarasyProject.mapper;

import group5.swp.HarasyProject.dto.request.account.RegisCustomerRequest;
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


    @Mapping(target = "role",source = "account.staff.role")
    @Mapping(target = "bankAccount",source = "account.staff.bankAccount")
    @Mapping(target = "bankName",source = "account.staff.bankName")
    @Mapping(target = "salary",source = "account.staff.salary")
    @Mapping(target = "branchName",source = "account.staff.branch.name")
    StaffProfileResponse toStaffProfileResponse(AccountEntity account);
    @Mapping(target = "vipPoint", source = "account.customer.vipPoint")
    CustomerProfileResponse toCustomerProfileResponse(AccountEntity account);

    void toStaffProfile(@MappingTarget CustomerProfileResponse response, StaffAccountEntity staffAccount);

}
