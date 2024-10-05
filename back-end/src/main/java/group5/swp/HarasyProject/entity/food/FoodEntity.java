package group5.swp.HarasyProject.entity.food;


import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import thinh.Kaka.entity.Auditable;
import thinh.Kaka.entity.menu.MenuEntity;
import thinh.Kaka.entity.order.OrderItem;

import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
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

    @Column(name = "food_img",nullable = false)
    String img;

    String description;

    @Column(nullable = false)
    long price;

    @Column(name="point_price",nullable = false)
    int pointsPrice;


    @ManyToMany
    @JoinTable(
            name = "menu_item",
            joinColumns = @JoinColumn(name = "food_id"),
            inverseJoinColumns = @JoinColumn(name = "menu_id")
    )
    Set<MenuEntity> menus;


    @ManyToOne
    @JoinColumn(name = "cat_id")
    CategoryEntity category;

    @OneToMany(mappedBy = "food")
    Set<OrderItem> orderItems;

}
