package group5.swp.HarasyProject.dto.request.account;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RegisCustomerRequest {
    String username;
    String password;
    String email;
    String fullName;
    String phone;
    Date dob;
}
    