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
    USER_NOT_FOUND(4000, "user not found", HttpStatus.NOT_FOUND),
    INVALID_OTP(4001, "invalid token", HttpStatus.UNAUTHORIZED),
    OTP_EXPIRED(4002, "expired otp", HttpStatus.UNAUTHORIZED),
    TOKEN_EXPIRED(4003,"expired token", HttpStatus.UNAUTHORIZED),
    ACCOUNT_NOT_ACTIVE(4004, "account not active", HttpStatus.UNAUTHORIZED),
    BRANCH_NOT_FOUND(4005, "branch not found", HttpStatus.NOT_FOUND),
    TABLE_EXIST(4005, "table already exist", HttpStatus.UNAUTHORIZED),
    TABLE_NOT_FOUND(4006, "table not found", HttpStatus.UNAUTHORIZED)
    ;

    int code;
    String message;
    HttpStatus httpStatus;

}
