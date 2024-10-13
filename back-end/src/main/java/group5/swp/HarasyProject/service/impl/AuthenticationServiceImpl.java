package group5.swp.HarasyProject.service.impl;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import group5.swp.HarasyProject.dto.request.auth.AuthenticationRequest;
import group5.swp.HarasyProject.dto.request.auth.IntrospectRequest;
import group5.swp.HarasyProject.dto.request.auth.LogoutRequest;
import group5.swp.HarasyProject.dto.request.auth.RefreshRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.auth.AuthenticationResponse;
import group5.swp.HarasyProject.dto.response.auth.IntrospectResponse;
import group5.swp.HarasyProject.dto.response.auth.LogoutResponse;
import group5.swp.HarasyProject.dto.response.auth.RefreshResponse;
import group5.swp.HarasyProject.entity.account.AccountEntity;
import group5.swp.HarasyProject.enums.Account.AccountStatus;
import group5.swp.HarasyProject.enums.ErrorCode;
import group5.swp.HarasyProject.exception.AppException;
import group5.swp.HarasyProject.repository.AccountRepository;
import group5.swp.HarasyProject.service.AuthenticationService;
import group5.swp.HarasyProject.service.RedisService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.UUID;


@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    AccountRepository accountRepository;
    RedisService redisService;

    @NonFinal
    @Value("${jwt.signerKey}")
    String SIGNER_KEY;

    @NonFinal
    @Value("${jwt.validDuration}")
    int VALID_DURATION;

    @NonFinal
    @Value("${jwt.refreshTokenDuration}")
    int REFRESH_DURATION;

    @Override
    public ApiResponse<IntrospectResponse> introspect(IntrospectRequest introspectRequest) throws JOSEException, ParseException {
        String token = introspectRequest.getToken();
        boolean isValid = true;
        try {
            verifyToken(token);
        } catch (AppException e) {
            isValid = false;
        }

        return ApiResponse.<IntrospectResponse>builder()
                .data(IntrospectResponse.builder()
                        .valid(isValid)
                        .build())
                .build();
    }

    @Override
    public ApiResponse<AuthenticationResponse> login(AuthenticationRequest authenticationRequest) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        AccountEntity accountEntity = accountRepository.findByUsername(authenticationRequest.getUsername())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        if (accountEntity.getStatus() == AccountStatus.ACTIVE) {
            boolean authenticated = passwordEncoder.matches(authenticationRequest.getPassword(), accountEntity.getPassword());
            return ApiResponse.<AuthenticationResponse>builder()
                    .code(authenticated ? 200 : HttpStatus.UNAUTHORIZED.value())
                    .message(authenticated ? "Login successful":"Login failed")
                    .data(AuthenticationResponse.builder()
                            .authenticated(authenticated)
                            .accessToken(authenticated ? generateToken(accountEntity,false) : null)
                            .refreshToken(authenticated ? generateToken(accountEntity,true) : null)
                            .build())
                    .build();
        } else throw new AppException(ErrorCode.ACCOUNT_NOT_ACTIVE);
    }


    @Override
    public ApiResponse<LogoutResponse> logout(LogoutRequest logoutRequest) throws ParseException, JOSEException {
        SignedJWT jwt = verifyToken(logoutRequest.getToken());
        String username = jwt.getJWTClaimsSet().getSubject();
        String jit = jwt.getJWTClaimsSet().getJWTID();
        long exTime = jwt.getJWTClaimsSet().getExpirationTime().getTime();
        long now = Instant.now().toEpochMilli();
        long timeToExpire = exTime - now;
        redisService.deleteRefreshToken(username);
        String message = "Logout successful";
        if (timeToExpire > 0) {
            redisService.addTokenToBlacklist(jit, timeToExpire);
        } else
            message = "Token has already expired";
        return ApiResponse.<LogoutResponse>builder()
                .data(LogoutResponse.builder()
                        .message(message)
                        .build())
                .build();
    }


    @Override
    public ApiResponse<RefreshResponse> refreshToken(RefreshRequest refreshRequest) throws ParseException, JOSEException {
        SignedJWT jwt = verifyToken(refreshRequest.getToken());
        String jit = jwt.getJWTClaimsSet().getJWTID();
        String username = jwt.getJWTClaimsSet().getSubject();
        AccountEntity account = accountRepository.findByUsername(username).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        String token="";
        if (redisService.isRefreshToken(username,jit))
            token = generateToken(account,false);
        return ApiResponse.<RefreshResponse>builder()
                .data(RefreshResponse.builder()
                        .token(token)
                        .build())
                .build();
    }

    private String generateToken(AccountEntity accountEntity, boolean isRefresh) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);
        JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                .issuer("thinh.Kaka")
                .subject(accountEntity.getUsername())
                .issueTime(new Date())
                .claim("scope", buildScope(accountEntity))
                .claim("id",accountEntity.getId().toString())
                .jwtID(UUID.randomUUID().toString())
                .expirationTime(new Date(Instant.now().plus(isRefresh
                        ? REFRESH_DURATION
                        : VALID_DURATION, ChronoUnit.SECONDS).toEpochMilli()))
                .build();

        Payload payload = new Payload(claimsSet.toJSONObject());
        if(isRefresh){
            long exTime = claimsSet.getExpirationTime().getTime();
            long now = Instant.now().toEpochMilli();
            long timeToExpire = exTime - now;
            redisService.storeRefreshToken(accountEntity.getUsername(), claimsSet.getJWTID(), timeToExpire);
        }
        JWSObject jwsObject = new JWSObject(header, payload);
        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            log.error(e.getMessage());
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
    }



    private SignedJWT verifyToken(String token) throws JOSEException, ParseException {
        SignedJWT signedJWT = SignedJWT.parse(token);
        JWSVerifier verifier = new MACVerifier(SIGNER_KEY.getBytes());
        Date expirationTime = signedJWT.getJWTClaimsSet().getExpirationTime();
        boolean verified = signedJWT.verify(verifier);
        if (!(verified && expirationTime.after(new Date()))) throw new AppException(ErrorCode.UNAUTHENTICATED);
        if (redisService.isTokenInBlacklist(signedJWT.getJWTClaimsSet().getJWTID()))
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        return signedJWT;
    }


    private String buildScope(AccountEntity account) {
        String scope = "";
        if (account.getCustomer() != null) {
            scope = "ROLE_CUSTOMER";
        }
        if (account.getStaff() != null) {
            scope = switch (account.getStaff().getRole()) {
                case RECEPTIONIST -> "ROLE_RECEPTIONIST";
                case CHEF -> "ROLE_CHEF";
                case ADMIN -> "ROLE_ADMIN";
                case BRANCH_MANAGER -> "ROLE_BRANCH_MANAGER";
                case WAITER -> "ROLE_WAITER";
            };
        }
        return scope;
    }
}
