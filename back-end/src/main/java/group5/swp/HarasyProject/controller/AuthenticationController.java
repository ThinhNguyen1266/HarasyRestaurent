package group5.swp.HarasyProject.controller;

import com.nimbusds.jose.JOSEException;
import group5.swp.HarasyProject.dto.request.auth.*;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.auth.*;
import group5.swp.HarasyProject.service.AccountService;
import group5.swp.HarasyProject.service.AuthenticationService;
import jakarta.mail.MessagingException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.io.IOException;
import java.text.ParseException;


@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class AuthenticationController {


    AccountService accountService;

    AuthenticationService authenticationService;


    @PostMapping("/auth/validateOtp")
    public ApiResponse<OtpResponse> validateOtp(@RequestBody OtpRequest otpRequest) throws IOException, MessagingException {
        return accountService.validateOtp(otpRequest);
    }

    @PostMapping("/auth/login")
    public ApiResponse<AuthenticationResponse> login(@RequestBody AuthenticationRequest authenticationRequest) {
        return authenticationService.login(authenticationRequest);
    }

    @PostMapping("/auth/introspect")
    public ApiResponse<IntrospectResponse> introspect(@RequestBody IntrospectRequest introspectRequest)  throws ParseException, JOSEException{
        return authenticationService.introspect(introspectRequest);
    }

    @PostMapping("/auth/logout")
    public ApiResponse<LogoutResponse> logout(@RequestBody LogoutRequest logoutRequest) throws ParseException, JOSEException {
        return authenticationService.logout(logoutRequest);
    }

    @PostMapping("/auth/refreshToken")
    public ApiResponse<RefreshResponse> refreshToken(@RequestBody RefreshRequest refreshRequest) throws ParseException, JOSEException {
        return authenticationService.refreshToken(refreshRequest);
    }
}
