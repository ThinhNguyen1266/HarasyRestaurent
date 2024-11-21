package group5.swp.HarasyProject.service.impl;

import group5.swp.HarasyProject.dto.request.account.*;
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
import group5.swp.HarasyProject.exception.AppException;
import group5.swp.HarasyProject.exception.ErrorCode;
import group5.swp.HarasyProject.mapper.AccountMapper;
import group5.swp.HarasyProject.mapper.StaffMapper;
import group5.swp.HarasyProject.repository.AccountRepository;
import group5.swp.HarasyProject.repository.BranchRepository;
import group5.swp.HarasyProject.repository.CustomerAccountRepository;
import group5.swp.HarasyProject.repository.StaffAccountRepository;
import group5.swp.HarasyProject.service.AccountService;
import group5.swp.HarasyProject.service.MailService;
import group5.swp.HarasyProject.service.OtpService;
import group5.swp.HarasyProject.service.RedisService;
import jakarta.mail.MessagingException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
    BranchRepository branchRepository;

    AccountMapper accountMapper;
    StaffMapper staffMapper;

    OtpService otpService;

    RedisService redisService;

    MailService mailService;

    PasswordEncoder passwordEncoder;


    @Override
    public ApiResponse<RegisResponse> customerRegis(RegisCustomerRequest request) throws IOException, MessagingException {
        AccountEntity accountEntity = accountMapper.regisCusToAccount(request);
        accountEntity.setPassword(passwordEncoder.encode(accountEntity.getPassword()));
        if (accountRepository.existsByEmail(request.getEmail())) throw new AppException(ErrorCode.EMAIL_EXISTED);
        if (accountRepository.existsByUsername(request.getUsername())) throw new AppException(ErrorCode.USERNAME_EXISTED);
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
    public ApiResponse<?> changePassword(int id, ChangePasswordRequest request) {
        AccountEntity accountEntity = accountRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        boolean authenticated = passwordEncoder.matches(request.getOldPassword(), accountEntity.getPassword());
        if (authenticated) {
            if (request.getNewPassword().equals(request.getConfirmPassword())) {
                accountEntity.setPassword(passwordEncoder.encode(request.getNewPassword()));
                accountRepository.save(accountEntity);
            } else throw new AppException(ErrorCode.PASSWORD_NOT_MATCH);
        } else throw new AppException(ErrorCode.WRONG_PASSWORD);
        return ApiResponse.builder().build();
    }

    @Override
    public ApiResponse<?> forgotPassword(ForgotPasswordRequest request) {
        AccountEntity accountEntity = accountRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        boolean haveSession = redisService.checkForgotPasswordSession(accountEntity.getEmail());
        if (!haveSession)
            throw new AppException(ErrorCode.HAVE_NO_SESSION_TO_FORGOT_PASSWORD);
        else {
            if(request.getNewPassword().equals(request.getConfirmPassword())) {
                accountEntity.setPassword(passwordEncoder.encode(request.getNewPassword()));
                accountRepository.save(accountEntity);
            }else throw new AppException(ErrorCode.PASSWORD_NOT_MATCH);
        }
        return ApiResponse.builder().build();
    }

    @Override
    public ApiResponse<StaffResponse> staffRegis(RegistStaffRequest request) throws IOException, MessagingException {
        AccountEntity accountEntity = accountMapper.staffRequestToAccount(request);
        accountEntity.setPassword(passwordEncoder.encode(accountEntity.getPassword()));
        StaffAccountEntity staffAccountEntity = accountMapper.staffRequestToStaffAccount(request);
        BranchEntity branch = branchRepository.findById(request.getBranchId())
                .orElseThrow(() -> new AppException(ErrorCode.BRANCH_NOT_FOUND));
        staffAccountEntity.setBranch(branch);

        accountEntity.setStaff(staffAccountEntity);
        staffAccountEntity.setAccount(accountEntity);
        StaffResponse staffResponse = staffMapper.toResponse(staffAccountEntity);
        System.out.println("staff account" + accountEntity);
        try {
            accountRepository.save(accountEntity);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ApiResponse.<StaffResponse>builder()
                .data(staffResponse)
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
    public ApiResponse<OtpResponse> validateOtpForgotPassword(OtpRequest otpRequest) {
        if (otpService.validateOtp(otpRequest)) {
            AccountEntity account = accountRepository
                    .findByEmail(otpRequest.getEmail()).orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));
            redisService.deleteOtp(otpRequest.getEmail());
            redisService.addForgotPasswordSession(otpRequest.getEmail());
            return ApiResponse.<OtpResponse>builder().data(OtpResponse.builder().message("Successfully verified OTP, you can change password now!").username(account.getUsername()).build()).build();
        } else throw new AppException(ErrorCode.INVALID_OTP);
    }

    @Override
    public ApiResponse<ProfileResponse> viewProfile(Integer id) {
        AccountEntity account = accountRepository
                .findById(id).orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));
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
                .stream().map(a -> {
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


    @Override
    public ApiResponse<CustomerProfileResponse> cusUpdateProfile(int id, CusUpdateProfileRequest request) {
        AccountEntity account = accountRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));
        CustomerAccountEntity customerAccount = customerAccountRepository.findByAccount(account)
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));
        customerAccount = accountMapper.updateCusInfo(request, customerAccount);
        System.out.println("cus update" + customerAccount);
        customerAccountRepository.save(customerAccount);
        CustomerProfileResponse response = accountMapper.toCustomerProfileResponse(account);
        return ApiResponse.<CustomerProfileResponse>builder()
                .code(200)
                .data(response)
                .build();
    }

    @Override
    public ApiResponse<?> resendEmail(ResendEmailRequest request) throws MessagingException, IOException {
        EmailRequest emailRequest = EmailRequest.builder().to(request.getEmail()).subject("Your OTP").build();
        mailService.sendOtpMail(emailRequest, otpService.generateOtp(request.getEmail()));
        return ApiResponse
                .builder()
                .build();
    }

    @Override
    public StaffAccountEntity saveStaff(StaffAccountEntity staff) {
        return staffAccountRepository.save(staff);
    }
}
