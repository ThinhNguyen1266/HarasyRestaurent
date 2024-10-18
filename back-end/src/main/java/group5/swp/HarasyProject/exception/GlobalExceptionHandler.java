package group5.swp.HarasyProject.exception;

import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.enums.ErrorCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(AppException.class)
    public ResponseEntity<ApiResponse<Void>> appExceptionHandler(AppException e) {
        ApiResponse<Void> apiResponse = ApiResponse.<Void>builder()
                .success(false)
                .message(e.getErrorCode().getMessage())
                .code(e.getErrorCode().getCode())
                .build();
        return ResponseEntity.status(e.getErrorCode().getHttpStatus()).body(apiResponse);
    }

}
