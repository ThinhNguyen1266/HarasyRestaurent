package group5.swp.HarasyProject.repository;

import group5.swp.HarasyProject.entity.order.OrderEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
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

    @Query("SELECT SUM(o.total) FROM OrderEntity o WHERE DATE(o.createdDate) = :specificDate AND o.paymentStatus = 'PAYED' ")
    Long calculateRevenueByDay(@Param("specificDate") LocalDate specificDate);

    @Query("SELECT DATE(o.createdDate) AS day, SUM(o.total) AS revenue FROM OrderEntity o " +
            "WHERE MONTH(o.createdDate) = :month AND YEAR(o.createdDate) = :year AND o.paymentStatus = 'PAYED' " +
            "GROUP BY DATE(o.createdDate)")
    List<Object[]> calculateDailyRevenueInMonth(@Param("month") int month, @Param("year") int year);

    @Query("SELECT SUM(o.total) FROM OrderEntity o WHERE MONTH(o.createdDate) = :month AND YEAR(o.createdDate) = :year AND o.paymentStatus = 'PAYED' ")
    Long calculateRevenueByMonth(@Param("month") int month, @Param("year") int year);

    @Query("SELECT MONTH(o.createdDate) AS month, SUM(o.total) AS revenue FROM OrderEntity o " +
            "WHERE YEAR(o.createdDate) = :year AND o.paymentStatus = 'PAYED' GROUP BY MONTH(o.createdDate)")
    List<Object[]> calculateMonthlyRevenueInYear(@Param("year") int year);

    @Query("SELECT SUM(o.total) FROM OrderEntity o WHERE YEAR(o.createdDate) = :year AND o.paymentStatus = 'PAYED' ")
    Long calculateRevenueByYear(@Param("year") int year);

    @Query("SELECT YEAR(o.createdDate) AS year, SUM(o.total) AS revenue FROM OrderEntity o WHERE o.paymentStatus = 'PAYED'  GROUP BY YEAR(o.createdDate)")
    List<Object[]> calculateTotalRevenueForAllYears();

    @Query("SELECT SUM(o.total) FROM OrderEntity o WHERE o.paymentStatus = 'PAYED' ")
    Long calculateRevenueAll();

    @Query("SELECT COUNT(o.id) FROM OrderEntity o where o.paymentStatus = 'PAYED'")
    Integer getTotalOrders();

    @Query("SELECT b.name AS branchName, SUM(o.total) as revenue " +
            "FROM BranchEntity b JOIN OrderEntity o " +
            "ON o.branch.id = b.id " +
            "WHERE o.paymentStatus = 'PAYED' " +
            "GROUP BY b.name")
    List<Object[]> getBranchesTotalRevenue();


    @Query("SELECT b.name AS branchName, MONTH(o.createdDate) as month , SUM(o.total) as revenue " +
            "FROM BranchEntity b JOIN OrderEntity o " +
            "ON o.branch.id = b.id " +
            "WHERE o.paymentStatus = 'PAYED' " +
            "GROUP BY b.name, month ")
    List<Object[]> getBranchesTotalRevenueInMonth();


    @Query("SELECT f.name as foodName, SUM(oi.total) as revenue, SUM(oi.quantity) as quantity " +
            "FROM FoodEntity f JOIN OrderItemEntity oi " +
            "ON oi.food.id = f.id " +
            "JOIN OrderEntity o " +
            "ON o.id = oi.order.id " +
            "WHERE o.paymentStatus = 'PAYED' " +
            "GROUP BY f.name " +
            "ORDER BY revenue DESC ")
    List<Object[]> getBestSellers(Pageable pageable);
}
