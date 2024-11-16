package group5.swp.HarasyProject.controller;


import group5.swp.HarasyProject.dto.request.account.RegisCustomerRequest;
import group5.swp.HarasyProject.dto.request.account.RegistStaffRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.account.ProfileResponse;
import group5.swp.HarasyProject.dto.response.account.RegisResponse;
import group5.swp.HarasyProject.dto.response.staff.StaffResponse;
import group5.swp.HarasyProject.service.AccountService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;


@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class AccountController  {

    AccountService accountService;

    @PostMapping("/regis/user")
    public ApiResponse<RegisResponse> regisUser(@RequestBody RegisCustomerRequest regisCustomerRequest) throws Exception {
        return accountService.customerRegis(regisCustomerRequest);
    }
    @PostMapping("/regis/staff")
    public ApiResponse<StaffResponse> regisStaff(@RequestBody RegistStaffRequest registStaffRequest) throws Exception {
        return accountService.staffRegis(registStaffRequest);
    }

    @GetMapping("/profile/{AccountId}")
    public ApiResponse<ProfileResponse> getProfile(@PathVariable Integer AccountId) throws Exception {
        return accountService.viewProfile(AccountId);
    }

}
