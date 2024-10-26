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
    USER_NOT_FOUND(4000, "user not found", HttpStatus.NOT_FOUND),
    INVALID_OTP(4001, "invalid token", HttpStatus.UNAUTHORIZED),
    OTP_EXPIRED(4002, "expired otp", HttpStatus.UNAUTHORIZED),
    ACCOUNT_NOT_ACTIVE(4004, "account not active", HttpStatus.UNAUTHORIZED),
    BRANCH_NOT_FOUND(4005, "branch not found", HttpStatus.NOT_FOUND),
    TABLE_EXIST(4006, "table already exist", HttpStatus.UNAUTHORIZED),
    TABLE_NOT_FOUND(4007, "table not found", HttpStatus.UNAUTHORIZED),
    BRANCH_IS_EXIST(4008,"branch name is duplicate",HttpStatus.CONFLICT),
    MENU_NOT_FOUND(4009, "menu not found", HttpStatus.NOT_FOUND),
    ;

    int code;
    String message;
    HttpStatus httpStatus;

}
