package group5.swp.HarasyProject.repository;


import group5.swp.HarasyProject.entity.food.CategoryEntity;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity,Integer> {
    Optional<CategoryEntity> findByName(String name);

    boolean existsByName(String name);
}
