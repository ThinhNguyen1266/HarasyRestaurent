package group5.swp.HarasyProject.dto.response.auth;

import com.fasterxml.jackson.annotation.JsonInclude;
import group5.swp.HarasyProject.exception.ErrorCode;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class IntrospectResponse {
    boolean valid;
    ErrorCode errorCode;
}
