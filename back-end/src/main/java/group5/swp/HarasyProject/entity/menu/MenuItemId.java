package group5.swp.HarasyProject.entity.menu;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class MenuItemId {
    @Column(name = "menu_id")
    int menuId;

    @Column(name = "food_id")
    int foodId;
}
