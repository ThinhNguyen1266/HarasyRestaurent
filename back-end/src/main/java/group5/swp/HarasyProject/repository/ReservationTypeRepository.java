package group5.swp.HarasyProject.repository;


import group5.swp.HarasyProject.entity.reservation.ReservationTypeEntity;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
@Repository
public interface ReservationTypeRepository  extends JpaRepository<ReservationTypeEntity, Integer> {


}
