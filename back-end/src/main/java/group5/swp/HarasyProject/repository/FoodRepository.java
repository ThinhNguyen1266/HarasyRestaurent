package group5.swp.HarasyProject.repository;


import group5.swp.HarasyProject.entity.food.FoodEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodRepository extends JpaRepository<FoodEntity, Integer> {
}
