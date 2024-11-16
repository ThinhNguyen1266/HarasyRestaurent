package group5.swp.HarasyProject.service.impl;

import group5.swp.HarasyProject.dto.request.auth.OtpRequest;
import group5.swp.HarasyProject.entity.account.AccountEntity;
import group5.swp.HarasyProject.exception.ErrorCode;
import group5.swp.HarasyProject.exception.AppException;
import group5.swp.HarasyProject.repository.AccountRepository;
import group5.swp.HarasyProject.service.OtpService;
import group5.swp.HarasyProject.service.RedisService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Random;


@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@RequiredArgsConstructor
public class OtpServiceImpl implements OtpService {

    AccountRepository accountRepository;
    RedisService redisService;

    @Override
    public String generateOtp(String email) {
        AccountEntity account = accountRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));
        String otp = String.valueOf(new Random().nextInt(100000, 999999));
        redisService.addOtp(otp,email);
        return otp;
    }

    @Override
    public boolean validateOtp(OtpRequest otpRequest) {
        return redisService.checkOtp(otpRequest.getToken(),otpRequest.getEmail());
    }

    
}
