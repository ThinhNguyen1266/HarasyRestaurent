package group5.swp.HarasyProject.repository;

import group5.swp.HarasyProject.entity.menu.MenuEntity;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

@Repository
public interface MenuRepository extends JpaRepository<MenuEntity, Integer> {

    @Query("select m " +
            "from MenuEntity m " +
            "where m.branch.id = :branchId " +
            "and (:isIncludeAll = true or m.status <> 'UNAVAILABLE' )")
    List<MenuEntity> findMenusInBranch(@Param("branchId") int branchId, @Param("isIncludeAll") boolean isIncludeAll);
}
