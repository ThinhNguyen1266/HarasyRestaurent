package group5.swp.HarasyProject.entity.order;

import group5.swp.HarasyProject.entity.Auditable;
import group5.swp.HarasyProject.entity.food.FoodEntity;
import group5.swp.HarasyProject.enums.OrderItemStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;


@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "orders_item")
public class OrderItem extends Auditable {

    @EmbeddedId
    OrderItemId id;

    @ManyToOne
    @MapsId("orderId")
    @JoinColumn(name = "order_id")
    OrderEntity order;


    @ManyToOne
    @MapsId("foodId")
    @JoinColumn(name = "food_id")
    FoodEntity food;

    @Column(nullable = false)
    int quantity;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    OrderItemStatus status;

    @Column(nullable = false)
    int price;

    @Column(nullable = false)
    long total;

    String note;


}
