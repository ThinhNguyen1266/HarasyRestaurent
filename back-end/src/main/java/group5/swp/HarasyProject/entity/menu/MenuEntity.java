package group5.swp.HarasyProject.entity.menu;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import thinh.Kaka.entity.branch.BranchEntity;
import thinh.Kaka.entity.food.FoodEntity;
import thinh.Kaka.enums.MenuType;

import java.util.Set;


@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "menu")
public class MenuEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "menu_id")
    Integer id;

    @Column(name = "menu_type", nullable = false)
    @Enumerated(EnumType.STRING)
    MenuType type;

    @ManyToOne
    @JoinColumn(name = "branch_id")
    BranchEntity branch;

    @ManyToMany(mappedBy = "menus")
    Set<FoodEntity> foods;

}
