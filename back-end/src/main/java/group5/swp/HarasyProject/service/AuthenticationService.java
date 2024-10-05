package group5.swp.HarasyProject.service;

import com.nimbusds.jose.JOSEException;
import group5.swp.HarasyProject.dto.request.auth.AuthenticationRequest;
import group5.swp.HarasyProject.dto.request.auth.IntrospectRequest;
import group5.swp.HarasyProject.dto.request.auth.LogoutRequest;
import group5.swp.HarasyProject.dto.request.auth.RefreshRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.auth.AuthenticationResponse;
import group5.swp.HarasyProject.dto.response.auth.IntrospectResponse;
import group5.swp.HarasyProject.dto.response.auth.LogoutResponse;
import group5.swp.HarasyProject.dto.response.auth.RefreshResponse;
import org.springframework.stereotype.Service;


import java.text.ParseException;

@Service
public interface AuthenticationService {

    ApiResponse<AuthenticationResponse> login(AuthenticationRequest authenticationRequest);

    ApiResponse<IntrospectResponse> introspect(IntrospectRequest introspectRequest)throws JOSEException, ParseException;

    ApiResponse<LogoutResponse> logout(LogoutRequest logoutRequest) throws ParseException, JOSEException;

    ApiResponse<RefreshResponse> refreshToken(RefreshRequest refreshRequest) throws ParseException, JOSEException;
}
