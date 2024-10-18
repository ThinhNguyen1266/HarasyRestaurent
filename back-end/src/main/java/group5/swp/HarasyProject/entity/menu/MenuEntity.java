package group5.swp.HarasyProject.entity.menu;

import group5.swp.HarasyProject.entity.branch.BranchEntity;
import group5.swp.HarasyProject.entity.food.FoodEntity;
import group5.swp.HarasyProject.enums.MenuType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;


import java.util.List;



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
    List<FoodEntity> foods;

}
