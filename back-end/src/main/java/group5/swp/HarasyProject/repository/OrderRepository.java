package group5.swp.HarasyProject.repository;

import group5.swp.HarasyProject.entity.order.OrderEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity,Integer> {
    @Query("SELECT o FROM OrderEntity o LEFT JOIN FETCH o.orderItems WHERE o.id = :orderId")
    Optional<OrderEntity> getOrderWithItems(@Param("orderId") int orderId);

    @Query("select o " +
            "from OrderEntity o " +
            "where o.branch.id = ?1 " +
            "and o.paymentStatus <> 'PAYED'")
    List<OrderEntity> findBranchInTimeOrder(Integer id);


    Page<OrderEntity> findByBranchId(int branchId, Pageable pageable);

    Page<OrderEntity> findByCustomerId(int customerId, Pageable pageable);
}
