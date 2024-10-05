package group5.swp.HarasyProject.exception;


import group5.swp.HarasyProject.enums.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
public class AppException extends RuntimeException {
    private ErrorCode errorCode;
}
