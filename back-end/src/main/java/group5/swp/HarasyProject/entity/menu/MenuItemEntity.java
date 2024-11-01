package group5.swp.HarasyProject.entity.menu;

import group5.swp.HarasyProject.entity.food.FoodEntity;
import group5.swp.HarasyProject.enums.MenuItemStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "menu_item")
public class MenuItemEntity {

    @EmbeddedId
    MenuItemId id;

    @ManyToOne
    @MapsId("menuId")
    @JoinColumn(name = "menu_id")
    MenuEntity menu;

    @ManyToOne
    @MapsId("foodId")
    @JoinColumn(name = "food_id")
    FoodEntity food;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    MenuItemStatus status;

}
