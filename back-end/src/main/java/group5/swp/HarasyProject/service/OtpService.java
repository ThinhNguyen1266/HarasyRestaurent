package group5.swp.HarasyProject.service;


import group5.swp.HarasyProject.dto.request.auth.OtpRequest;
import org.springframework.stereotype.Service;


@Service
public interface OtpService {

    String generateOtp(String email);
    boolean validateOtp(OtpRequest otpRequest);
    void deleteOtp(String otp);
}
