package group5.swp.HarasyProject.repository;


import group5.swp.HarasyProject.entity.order.OrderItemEntity;
import group5.swp.HarasyProject.entity.order.OrderItemId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItemEntity, OrderItemId> {

    List<OrderItemEntity> findByOrderId(int orderId);

    Optional<OrderItemEntity> findByOrderIdAndFoodId(int orderId, int foodId);
}
