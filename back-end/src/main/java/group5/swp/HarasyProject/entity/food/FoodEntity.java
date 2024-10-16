package group5.swp.HarasyProject.entity.food;


import group5.swp.HarasyProject.entity.Auditable;
import group5.swp.HarasyProject.entity.menu.MenuEntity;
import group5.swp.HarasyProject.entity.order.OrderItem;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;


import java.util.List;
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
    List<MenuEntity> menus;


    @ManyToOne
    @JoinColumn(name = "cat_id")
    CategoryEntity category;

    @OneToMany(mappedBy = "food")
    List<OrderItem> orderItems;

}
