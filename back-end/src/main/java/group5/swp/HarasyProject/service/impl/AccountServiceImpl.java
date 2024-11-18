package group5.swp.HarasyProject.service.impl;

import group5.swp.HarasyProject.dto.request.account.QuickRegisCustomerRequest;
import group5.swp.HarasyProject.dto.request.account.RegisCustomerRequest;
import group5.swp.HarasyProject.dto.request.auth.EmailRequest;
import group5.swp.HarasyProject.dto.request.auth.OtpRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.account.CustomerProfileResponse;
import group5.swp.HarasyProject.dto.response.account.ProfileResponse;
import group5.swp.HarasyProject.dto.response.account.RegisResponse;
import group5.swp.HarasyProject.dto.response.auth.OtpResponse;
import group5.swp.HarasyProject.entity.account.AccountEntity;
import group5.swp.HarasyProject.entity.account.CustomerAccountEntity;
import group5.swp.HarasyProject.entity.account.StaffAccountEntity;
import group5.swp.HarasyProject.enums.Account.AccountStatus;
import group5.swp.HarasyProject.exception.AppException;
import group5.swp.HarasyProject.exception.ErrorCode;
import group5.swp.HarasyProject.mapper.AccountMapper;
import group5.swp.HarasyProject.repository.AccountRepository;
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
import java.util.Arrays;
import java.util.List;


@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    AccountRepository accountRepository;
    CustomerAccountRepository customerAccountRepository;
    StaffAccountRepository staffAccountRepository;


    AccountMapper accountMapper;

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
        return ApiResponse
                .<RegisResponse>builder()
                .code(200)
                .data(RegisResponse.builder()
                        .message("Register successfully, please enter otp to done")
                        .build())
                .build();
    }

    @Override
    @Transactional
    public ApiResponse<OtpResponse> validateOtp(OtpRequest otpRequest) {
        if (otpService.validateOtp(otpRequest)) {
            AccountEntity account = accountRepository.findByEmail(otpRequest.getEmail()).orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));
            account.setStatus(AccountStatus.ACTIVE);
            redisService.deleteOtp(otpRequest.getEmail());
            accountRepository.save(account);
            return ApiResponse.<OtpResponse>builder().data(OtpResponse.builder().message("Successfully verified OTP, you can sign in now!").username(account.getUsername()).build()).build();
        } else throw new AppException(ErrorCode.INVALID_OTP);
    }

    @Override
    public ApiResponse<ProfileResponse> viewProfile(Integer id) {
        AccountEntity account = accountRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));
        ProfileResponse response;
        if (account.getCustomer() != null) {
            response = accountMapper.toCustomerProfileResponse(account);
        } else {
            response = accountMapper.toStaffProfileResponse(account);
        }
        return ApiResponse.<ProfileResponse>builder().data(response)
                .build();
    }


    @Override
    public ApiResponse<CustomerProfileResponse> quickCustomerRegis(QuickRegisCustomerRequest request) {
        if (accountRepository.existsByEmail(request.getEmail())) throw new AppException(ErrorCode.EMAIL_EXISTED);


        AccountEntity accountEntity = accountMapper.quickRegisToAccount(request);
        accountEntity.setPassword(passwordEncoder.encode("123456"));
        String username = Arrays
                .stream(request.getFullName()
                        .split(" "))
                .reduce("", String::concat);
        do {
            int randomNumber = (int) (Math.random() * 900) + 100;
            accountEntity.setUsername(username + randomNumber);
        } while (accountRepository.existsByUsername(accountEntity.getUsername()));
        CustomerAccountEntity customerAccount = new CustomerAccountEntity();
        accountEntity.setCustomer(customerAccount);
        accountEntity = accountRepository.save(accountEntity);
        CustomerProfileResponse response = accountMapper.toCustomerProfileResponse(accountEntity);
        return ApiResponse.<CustomerProfileResponse>builder()
                .code(200)
                .data(response)
                .build();
    }


    @Override
    public ApiResponse<List<ProfileResponse>> getAccounts(String phone) {
        List<AccountEntity> acc = accountRepository.findAllAcc(phone);
        List<ProfileResponse> responses = acc
                .stream().map(a->{
                    if (a.getCustomer() != null) {
                        return accountMapper.toCustomerProfileResponse(a);
                    } else {
                        return accountMapper.toStaffProfileResponse(a);
                    }
                })
                .toList();
        return ApiResponse.<List<ProfileResponse>>builder()
                .data(responses)
                .build();
    }

    @Override
    public StaffAccountEntity getStaffAccount(Integer staffId) {
        return staffAccountRepository.findById(staffId)
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));
    }

    @Override
    public CustomerAccountEntity getCustomerAccount(Integer customerId) {
        return customerAccountRepository.findById(customerId)
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));
    }
}
