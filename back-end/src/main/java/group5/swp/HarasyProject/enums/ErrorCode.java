package group5.swp.HarasyProject.enums;


import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;

@Getter
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public enum ErrorCode {
    UNAUTHENTICATED(5000, "unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(5001, "you not have permission", HttpStatus.FORBIDDEN),
    TOKEN_EXPIRED(5003,"expired token", HttpStatus.UNAUTHORIZED),
    TOKEN_REVOKED(5004,"revoked token", HttpStatus.UNAUTHORIZED),
    INVALID_OTP(4001, "invalid token", HttpStatus.UNAUTHORIZED),
    OTP_EXPIRED(4002, "expired otp", HttpStatus.UNAUTHORIZED),
    ACCOUNT_NOT_ACTIVE(4004, "account not active", HttpStatus.UNAUTHORIZED),
    TOKEN_NULL(10000, "token is null", HttpStatus.UNAUTHORIZED),
    ALREADY_EXIST_ENTITY(1000, "entity already exist", HttpStatus.CONFLICT),
    ENTITY_NOT_FOUND(1001, "entity not found", HttpStatus.NOT_FOUND),
    ;

    int code;
    String message;
    HttpStatus httpStatus;

}
