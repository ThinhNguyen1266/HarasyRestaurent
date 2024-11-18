package group5.swp.HarasyProject.entity.food;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "category")
public class CategoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cat_id")
    Integer id;


    @Column(name = "cat_name", nullable = false)
    String name;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    List<FoodEntity> foods;
}
