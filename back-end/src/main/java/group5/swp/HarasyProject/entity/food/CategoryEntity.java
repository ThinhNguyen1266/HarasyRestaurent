package group5.swp.HarasyProject.entity.food;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.Set;

@Entity
@Data
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

    
    @Column(name = "cat_name",nullable = false)
    String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    CategoryEntity parent;

    @OneToMany(mappedBy = "parent",cascade = CascadeType.ALL)
    List<CategoryEntity> children;

    @OneToMany(mappedBy = "category",cascade = CascadeType.ALL)
    Set<FoodEntity> foods;
}
