package group5.swp.HarasyProject.repository;

import group5.swp.HarasyProject.entity.reservation.ReservationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<ReservationEntity, Integer> {
    @Query(value = """                    
            select ts.slot_time, sum(t.capacity)
                   from tables t
                            left join reservation_table rt
                                      on t.table_id = rt.table_id
                            left join reservation r
                                      on rt.reservation_id = r.reservation_id
                            join (:timeSlots) AS ts (slot_time)
                   where t.branch_id = :branchId
                     and t.status = 'AVAILABLE'
                     and (r.reservation_date is null
                       or (
                              r.reservation_date = :date
                                  and (
                                  r.status <> 'APPROVED'
                                      or (
                                      r.status = 'APPROVED'
                                          and
                                      r.reservation_time not between SUBTIME(slot_time, '1:30') AND ADDTIME(slot_time, '1:30')
                                      )
                                  )
                              )
                       or (r.reservation_date <> :date
                           AND NOT EXISTS (SELECT 1
                                           FROM reservation_table rt2
                                                    JOIN reservation r2
                                                         ON rt2.reservation_id = r2.reservation_id
                                           WHERE r2.reservation_date = :date
                                             AND rt2.table_id = t.table_id))
                       )
                   group by slot_time
                   having sum(t.capacity) >= :amountGuest
                   order by slot_time;
            """, nativeQuery = true)
    List<String> getAvailableTime(int branchId, String timeSlots, LocalDate date, int amountGuest);


}
