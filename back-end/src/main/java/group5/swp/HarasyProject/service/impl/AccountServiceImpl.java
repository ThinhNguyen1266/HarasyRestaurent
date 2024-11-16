package group5.swp.HarasyProject.service.impl;

import group5.swp.HarasyProject.dto.request.account.RegisCustomerRequest;
import group5.swp.HarasyProject.dto.request.account.RegistStaffRequest;
import group5.swp.HarasyProject.dto.request.auth.EmailRequest;
import group5.swp.HarasyProject.dto.request.auth.OtpRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.account.CustomerProfileResponse;
import group5.swp.HarasyProject.dto.response.account.ProfileResponse;
import group5.swp.HarasyProject.dto.response.account.RegisResponse;
import group5.swp.HarasyProject.dto.response.auth.OtpResponse;
import group5.swp.HarasyProject.dto.response.staff.StaffResponse;
import group5.swp.HarasyProject.entity.account.AccountEntity;
import group5.swp.HarasyProject.entity.account.CustomerAccountEntity;
import group5.swp.HarasyProject.entity.account.StaffAccountEntity;
import group5.swp.HarasyProject.entity.branch.BranchEntity;
import group5.swp.HarasyProject.enums.Account.AccountStatus;
import group5.swp.HarasyProject.enums.ErrorCode;
import group5.swp.HarasyProject.exception.AppException;
import group5.swp.HarasyProject.mapper.AccountMapper;
import group5.swp.HarasyProject.mapper.StaffMapper;
import group5.swp.HarasyProject.repository.AccountRepository;
import group5.swp.HarasyProject.repository.BranchRepository;
import group5.swp.HarasyProject.repository.CustomerAccountRepository;
import group5.swp.HarasyProject.repository.StaffAccountRepository;
import group5.swp.HarasyProject.service.AccountService;
import group5.swp.HarasyProject.service.MailService;
import group5.swp.HarasyProject.service.OtpService;
import jakarta.mail.MessagingException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.io.IOException;
import java.util.Optional;


@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    AccountRepository accountRepository;
    CustomerAccountRepository customerAccountRepository;
    StaffAccountRepository staffAccountRepository;
    BranchRepository branchRepository;

    AccountMapper accountMapper;
    StaffMapper staffMapper;


    OtpService otpService;

    RedisServiceImpl redisService;

    MailService mailService;

    PasswordEncoder passwordEncoder;


    @Override
    public ApiResponse<RegisResponse> customerRegis(RegisCustomerRequest request) throws IOException, MessagingException {
        AccountEntity accountEntity = accountMapper.regisCusToAccount(request);
        accountEntity.setPassword(passwordEncoder.encode(accountEntity.getPassword()));
        accountEntity.setCustomer(new CustomerAccountEntity());
        accountRepository.save(accountEntity);
        EmailRequest emailRequest = EmailRequest.builder().to(request.getEmail()).subject("Your OTP").build();
        mailService.sendOtpMail(emailRequest, otpService.generateOtp(accountEntity.getEmail()));
        return ApiResponse.<RegisResponse>builder().code(200).data(RegisResponse.builder().message("Register successfully, please enter otp to done").build()).build();
    }

    @Override
    public ApiResponse<StaffResponse> staffRegis(RegistStaffRequest request) throws IOException, MessagingException {
        AccountEntity accountEntity = accountMapper.staffRequestToAccount(request);
        accountEntity.setPassword(passwordEncoder.encode(accountEntity.getPassword()));
        StaffAccountEntity staffAccountEntity = accountMapper.staffRequestToStaffAccount(request);
        BranchEntity branch=branchRepository.findById(request.getBranchId())
                .orElseThrow(() -> new AppException(ErrorCode.BRANCH_NOT_FOUND));
        staffAccountEntity.setBranch(branch);

        accountEntity.setStaff(staffAccountEntity);
        staffAccountEntity.setAccount(accountEntity);
        StaffResponse staffResponse=staffMapper.toResponse(staffAccountEntity);
        System.out.println("staff account"+accountEntity);
        try {
            accountRepository.save(accountEntity);
        } catch (Exception e) {
            e.printStackTrace(); // This will give you more details on the actual issue
        }
        return ApiResponse.<StaffResponse>builder()
                .data(staffResponse)
                .build();

    }

    @Override
    @Transactional
    public ApiResponse<OtpResponse> validateOtp(OtpRequest otpRequest) throws IOException, MessagingException {
        if (otpService.validateOtp(otpRequest)) {
            AccountEntity account = accountRepository.findByEmail(otpRequest.getEmail()).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
            account.setStatus(AccountStatus.ACTIVE);
            redisService.deleteOtp(otpRequest.getEmail());
            accountRepository.save(account);
            return ApiResponse.<OtpResponse>builder().data(OtpResponse.builder().message("Successfully verified OTP, you can sign in now!").username(account.getUsername()).build()).build();
        }
        return ApiResponse.<OtpResponse>builder().success(false).data(OtpResponse.builder().message("Invalid otp").build()).build();
    }

    @Override
    public ApiResponse<ProfileResponse> viewProfile(Integer id) throws IOException, MessagingException {
        AccountEntity account = accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Not found Account ID: "+id));
        ProfileResponse response;
        if(account.getCustomer()!=null ){
            response = accountMapper.toCustomerProfileResponse(account);
        }else {
            response = accountMapper.toStaffProfileResponse(account);
        }


        return ApiResponse.<ProfileResponse>builder().data(response)
                .build();
    }
}
