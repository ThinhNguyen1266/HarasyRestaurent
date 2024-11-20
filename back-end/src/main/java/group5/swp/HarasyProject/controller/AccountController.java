package group5.swp.HarasyProject.controller;


import group5.swp.HarasyProject.dto.request.account.*;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.account.CustomerProfileResponse;
import group5.swp.HarasyProject.dto.response.account.ProfileResponse;
import group5.swp.HarasyProject.dto.response.account.RegisResponse;
import group5.swp.HarasyProject.dto.response.staff.StaffResponse;
import group5.swp.HarasyProject.service.AccountService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;


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

    @GetMapping("/profile/{id}")
    public ApiResponse<ProfileResponse> getProfile(@PathVariable Integer id) throws Exception {
        return accountService.viewProfile(id);
    }

    @GetMapping("/accounts")
    public ApiResponse<List<ProfileResponse>> getCustomerProfile(@RequestParam(required = false) String phone)  {
        return accountService.getAccounts(phone);
    }

    @PostMapping("/quickregis/user")
    public ApiResponse<CustomerProfileResponse> quickregisUser(@RequestBody QuickRegisCustomerRequest quickRegisCustomerRequest) throws Exception {
        return accountService.quickCustomerRegis(quickRegisCustomerRequest);
    }

    @PutMapping("/profile/{id}")
    public  ApiResponse<CustomerProfileResponse> updateCusProfile(@RequestBody CusUpdateProfileRequest request , @PathVariable Integer id) throws Exception {
        return accountService.cusUpdateProfile(id,request);
    }
    @PostMapping("/account/{id}/changePassword")
    public ApiResponse<?> changePassword(@PathVariable int id, @RequestBody ChangePasswordRequest request){
        return null;
    }

}
