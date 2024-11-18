package group5.swp.HarasyProject.controller;


import group5.swp.HarasyProject.dto.request.account.QuickRegisCustomerRequest;
import group5.swp.HarasyProject.dto.request.account.RegisCustomerRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.account.CustomerProfileResponse;
import group5.swp.HarasyProject.dto.response.account.ProfileResponse;
import group5.swp.HarasyProject.dto.response.account.RegisResponse;
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

    @GetMapping("/profile/{AccountId}")
    public ApiResponse<ProfileResponse> getProfile(@PathVariable Integer AccountId) throws Exception {
        return accountService.viewProfile(AccountId);
    }

    @GetMapping("/accounts")
    public ApiResponse<List<ProfileResponse>> getCustomerProfile(@RequestParam(required = false) String phone)  {
        return accountService.getAccounts(phone);
    }

    @PostMapping("/quickregis/user")
    public ApiResponse<CustomerProfileResponse> quickregisUser(@RequestBody QuickRegisCustomerRequest quickRegisCustomerRequest) throws Exception {
        return accountService.quickCustomerRegis(quickRegisCustomerRequest);
    }

}
