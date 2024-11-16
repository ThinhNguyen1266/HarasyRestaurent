package group5.swp.HarasyProject.dto.response.order;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderInTimeResponse {
    Integer id;
    List<Integer> tableIds;
    List<OrderInTimeResponse> orderItems;
    String note;
}
