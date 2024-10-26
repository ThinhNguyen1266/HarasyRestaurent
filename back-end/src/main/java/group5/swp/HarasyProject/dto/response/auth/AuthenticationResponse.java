package group5.swp.HarasyProject.dto.response.auth;


import com.fasterxml.jackson.annotation.JsonInclude;
import group5.swp.HarasyProject.dto.response.account.ProfileResponse;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthenticationResponse {
    String accessToken;
    ProfileResponse user;
    boolean authenticated;
}
