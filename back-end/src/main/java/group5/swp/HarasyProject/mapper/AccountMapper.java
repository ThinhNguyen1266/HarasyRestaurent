package group5.swp.HarasyProject.mapper;

import group5.swp.HarasyProject.dto.request.account.CusUpdateProfileRequest;
import group5.swp.HarasyProject.dto.request.account.QuickRegisCustomerRequest;
import group5.swp.HarasyProject.dto.request.account.RegisCustomerRequest;
import group5.swp.HarasyProject.dto.request.account.RegistStaffRequest;
import group5.swp.HarasyProject.dto.request.staff.StaffRequest;
import group5.swp.HarasyProject.dto.response.account.CustomerProfileResponse;
import group5.swp.HarasyProject.dto.response.account.StaffProfileResponse;
import group5.swp.HarasyProject.entity.account.AccountEntity;
import group5.swp.HarasyProject.entity.account.CustomerAccountEntity;
import group5.swp.HarasyProject.entity.account.StaffAccountEntity;
import org.mapstruct.*;

@Mapper(componentModel = "spring", nullValueMapMappingStrategy = NullValueMappingStrategy.RETURN_DEFAULT, nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface AccountMapper {

    @Mapping(target = "status", constant = "PENDING")
    AccountEntity regisCusToAccount(RegisCustomerRequest regisCustomerRequest);
    @Mapping(target = "status", constant = "ACTIVE")
    AccountEntity staffRequestToAccount(RegistStaffRequest registStaffRequest);
//    @Mapping(target = "branchId", ignore = true)
    StaffAccountEntity staffRequestToStaffAccount(RegistStaffRequest registStaffRequest);

    // Mapping cho Quick Registration

    @Mapping(target = "status", constant = "INACTIVE")
    @Mapping(target = "password", ignore = true)
    AccountEntity quickRegisToAccount(QuickRegisCustomerRequest request);

    @Mapping(target = "vipPoint", source = "customer.vipPoint")
    @Mapping(target = "customerId", source = "customer.id")
    @Mapping(target = "accountId", source = "account.id")
    CustomerProfileResponse toCustomerProfileResponse(AccountEntity account);

    @Mapping(target = "account.fullName", source = "fullName")
    @Mapping(target = "account.dob", source = "dob")
    CustomerAccountEntity updateCusInfo(CusUpdateProfileRequest request, @MappingTarget CustomerAccountEntity customerAccount);

    @Mapping(target = "role", source = "account.staff.role")
    @Mapping(target = "bankAccount", source = "account.staff.bankAccount")
    @Mapping(target = "bankName", source = "account.staff.bankName")
    @Mapping(target = "salary", source = "account.staff.salary")
    @Mapping(target = "branchName", source = "account.staff.branch.name")
    @Mapping(target = "branchId", source = "account.staff.branch.id")
    @Mapping(target = "id", source = "account.staff.id")
    @Mapping(target = "accountId", source = "account.id")
    @Mapping(target = "picture", source = "account.staff.picture")
    StaffProfileResponse toStaffProfileResponse(AccountEntity account);

    void toStaffProfile(@MappingTarget CustomerProfileResponse response, StaffAccountEntity staffAccount);



}
