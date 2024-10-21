package group5.swp.HarasyProject.exception;

import org.springframework.security.core.AuthenticationException;

public class JwtAuthenticationException extends AuthenticationException {
    public JwtAuthenticationException(AppException cause) {
        super(cause.getMessage(), cause);
    }
}
