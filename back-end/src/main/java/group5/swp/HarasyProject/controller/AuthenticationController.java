package group5.swp.HarasyProject.controller;

import com.nimbusds.jose.JOSEException;
import group5.swp.HarasyProject.dto.request.account.ResendEmailRequest;
import group5.swp.HarasyProject.dto.request.auth.*;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.auth.*;
import group5.swp.HarasyProject.service.AccountService;
import group5.swp.HarasyProject.service.AuthenticationService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.ParseException;


@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class AuthenticationController {


    AccountService accountService;

    AuthenticationService authenticationService;


    @PostMapping("/auth/validateOtp")
    public ApiResponse<OtpResponse> validateOtp(@RequestBody OtpRequest otpRequest) {
        return accountService.validateOtp(otpRequest);
    }

    @PostMapping("/auth/login")
    public ApiResponse<AuthenticationResponse> login(@RequestBody AuthenticationRequest authenticationRequest, HttpServletResponse response) {
        return authenticationService.login(authenticationRequest, response);
    }

    @PostMapping("/auth/introspect")
    public ApiResponse<IntrospectResponse> introspect(@RequestBody IntrospectRequest introspectRequest)  throws ParseException, JOSEException{
        return authenticationService.introspect(introspectRequest);
    }

    @PostMapping("/auth/logout")
    public ApiResponse<LogoutResponse> logout(@RequestHeader("Authorization") String accessToken) throws ParseException, JOSEException {
        if (accessToken.startsWith("Bearer ")) {
            accessToken = accessToken.substring(7);
        }
        return authenticationService.logout(accessToken);
    }

    @PostMapping("/auth/refreshToken")
    public ApiResponse<RefreshResponse> refreshToken(HttpServletRequest request) throws ParseException, JOSEException {
        return authenticationService.refreshToken(request);
    }

    @PostMapping("/resend/otp")
    public ApiResponse<?> resendOtp(@RequestBody ResendEmailRequest request) throws MessagingException, IOException {
        return accountService.resendEmail(request);
    }
}
