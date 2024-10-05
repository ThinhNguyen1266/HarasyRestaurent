package group5.swp.HarasyProject.service.impl;

import group5.swp.HarasyProject.dto.request.auth.OtpRequest;
import group5.swp.HarasyProject.entity.OtpTokenEntity;
import group5.swp.HarasyProject.entity.account.AccountEntity;
import group5.swp.HarasyProject.enums.ErrorCode;
import group5.swp.HarasyProject.exception.AppException;
import group5.swp.HarasyProject.repository.AccountRepository;
import group5.swp.HarasyProject.repository.OtpTokenRepository;
import group5.swp.HarasyProject.service.OtpService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;


@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@RequiredArgsConstructor
public class OtpServiceImpl implements OtpService {

    AccountRepository accountRepository;


    OtpTokenRepository otpTokenRepository;

    @Override
    public String generateOtp(String email) {
        AccountEntity account = accountRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        String otp = String.valueOf(new Random().nextInt(100000, 999999));
        OtpTokenEntity otpToken = OtpTokenEntity.builder().token(otp).account(account).expirationTime(LocalDateTime.now().plusMinutes(5)).build();
        otpTokenRepository.save(otpToken);
        return otp;
    }

    @Override
    public boolean validateOtp(OtpRequest otpRequest) {
        OtpTokenEntity otp = otpTokenRepository.findByToken(otpRequest.getToken()).orElseThrow(() -> new AppException(ErrorCode.INVALID_OTP));
        if (otp.getExpirationTime().isBefore(LocalDateTime.now())) {
            throw new AppException(ErrorCode.OTP_EXPIRED);
        }
        return true;
    }


    @Override
    public void deleteOtp(String otp) {
        otpTokenRepository.deleteByToken(otp);
    }
}
