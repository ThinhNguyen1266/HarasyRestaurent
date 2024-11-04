package group5.swp.HarasyProject.entity.food;


import group5.swp.HarasyProject.entity.Auditable;
import group5.swp.HarasyProject.entity.menu.MenuItemEntity;
import group5.swp.HarasyProject.entity.order.OrderItem;
import group5.swp.HarasyProject.enums.Status;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "food")
public class FoodEntity extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "food_id")
    Integer id;

    @Column(name = "food_name", nullable = false)
    String name;

    @Column(name = "food_img", nullable = false)
    String image;

    String description;

    @Column(nullable = false)
    long price;

    @Column(name = "point_price", nullable = false)
    int pointsPrice;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    Status status = Status.INACTIVE;


    @OneToMany(mappedBy = "food")
    List<MenuItemEntity> menuItems;


    @ManyToOne
    @JoinColumn(name = "cat_id")
    CategoryEntity category;

    @OneToMany(mappedBy = "food")
    List<OrderItem> orderItems;

}
