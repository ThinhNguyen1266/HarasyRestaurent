package group5.swp.HarasyProject.repository;


import group5.swp.HarasyProject.entity.menu.MenuItemEntity;
import group5.swp.HarasyProject.entity.menu.MenuItemId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItemEntity, MenuItemId> {
    List<MenuItemEntity> findByMenuId(int menuId);

}
