package group5.swp.HarasyProject.entity.order;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;


@Embeddable
@Getter
@Setter
public class OrderItemId implements Serializable {

    @Column(name = "order_id")
    int orderId;

    @Column(name = "food_id")
    int foodId;
}
