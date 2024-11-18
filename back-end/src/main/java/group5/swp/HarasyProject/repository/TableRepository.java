package group5.swp.HarasyProject.repository;

import group5.swp.HarasyProject.entity.branch.TableEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface TableRepository extends JpaRepository<TableEntity, Integer> {

    @Query("select t " +
            "from TableEntity t " +
            "where t.branch.id = ?1 ")
    List<TableEntity> getTableByBBranch(int branchId);

    @Query("""
                        select t
                        from TableEntity t
                                 left join t.reservations r
                        where t.branch.id = :branchId
                          and t.status = 'AVAILABLE'
                          and (r  is null
                            or (
                                   r.reservationDate = :date
                                       and (
                                       r.status <> 'APPROVED'
                                           or (
                                           r.status = 'APPROVED'
                                               and
                                            (r.reservationTime < :minTime
                                                                     OR r.reservationTime > :maxTime)
                                           )
                                       )
                                   )
                            or (r.reservationDate <> :date
                                AND NOT EXISTS (SELECT rt
                                                    FROM TableEntity rt
                                                        JOIN rt.reservations r2
                                                    WHERE r2.reservationDate = :date
                                                    AND rt.id = t.id))
                            )
                        order by t.capacity desc
            """)
    List<TableEntity> getAvailableForReserve(int branchId, LocalDate date, LocalTime minTime, LocalTime maxTime);


}
