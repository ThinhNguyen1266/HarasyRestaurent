package group5.swp.HarasyProject.repository;

import group5.swp.HarasyProject.entity.reservation.ReservationEntity;
import group5.swp.HarasyProject.enums.ReservationStatus;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReservationRepository extends JpaRepository<ReservationEntity, Integer> {
    // Fetch all reservations with APPROVED status
    List<ReservationEntity> findAllByStatus(ReservationStatus status);

    @Query("SELECT r FROM ReservationEntity r WHERE r.customer.account.fullName LIKE %:customerName%")
    List<ReservationEntity> findByCustomerName(String customerName);
}
