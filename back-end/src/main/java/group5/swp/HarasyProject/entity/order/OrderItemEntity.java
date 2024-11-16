package group5.swp.HarasyProject.entity.order;

import group5.swp.HarasyProject.entity.Auditable;
import group5.swp.HarasyProject.entity.food.FoodEntity;
import group5.swp.HarasyProject.enums.OrderItemStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;


@EqualsAndHashCode(callSuper = true)
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "orders_item")
public class OrderItemEntity extends Auditable {

    @EmbeddedId
    OrderItemId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("orderId")
            @JoinColumn(name = "order_id")
    OrderEntity order;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("foodId")
    @JoinColumn(name = "food_id")
    FoodEntity food;

    @Column(nullable = false)
    int quantity;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    OrderItemStatus status;

    @Column(nullable = false)
    long price;

    @Column(nullable = false)
    long total;

    @Column(nullable = false)
    int cooked;

    public OrderItemEntity calculatePrice(){
        if (food != null){
            if (food.getPrice() > 0) {
                price = food.getPrice();
                total = food.getPrice() * quantity;
            } else {
                price = 0;
                total = 0;
            }
        }
        return this;
    }

}
