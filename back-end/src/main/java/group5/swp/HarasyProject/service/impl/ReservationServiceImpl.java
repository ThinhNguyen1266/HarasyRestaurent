package group5.swp.HarasyProject.service.impl;

import group5.swp.HarasyProject.dto.response.reservation.ReservationResponse;
import group5.swp.HarasyProject.entity.reservation.ReservationEntity;
import group5.swp.HarasyProject.exception.AppException;
import group5.swp.HarasyProject.exception.ErrorCode;
import group5.swp.HarasyProject.mapper.ReservationMapper;
import group5.swp.HarasyProject.repository.ReservationRepository;
import group5.swp.HarasyProject.service.ReservationService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
public class ReservationServiceImpl implements ReservationService {

    ReservationRepository reservationRepository;
    ReservationMapper reservationMapper;
    EntityManager entityManager;

    @Override
    public List<String> getAvailableTime(int branchId, String timeSlots, LocalDate date, int amountGuest) {
        String sql = String.format("""
                    select ts.slot_time
                   from tables t
                            left join reservation_table rt
                                      on t.table_id = rt.table_id
                            left join reservation r
                                      on rt.reservation_id = r.reservation_id
                            join (%s) AS ts (slot_time)
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
                """, timeSlots);

        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("amountGuest", amountGuest);
        query.setParameter("branchId", branchId);
        query.setParameter("date", date);
        List list = query.getResultList();
        return (List<String>) list.stream().map(l-> (String) l ).toList();
    }

    @Override
    public Page<ReservationEntity> getAllReservationsInBranch(Pageable pageable, Boolean isHistory,int branchId) {
        return reservationRepository.getAllReservation(pageable,isHistory,branchId);
    }

    @Override
    public ReservationEntity getReservationById(int id) {
        return reservationRepository
                .findById(id).orElseThrow(()->new AppException(ErrorCode.RESERVATION_NOT_FOUND));
    }

    @Override
    public ReservationEntity saveReservation(ReservationEntity reservation) {
        return reservationRepository.save(reservation);
    }


    @Override
    public ReservationResponse toReservationResponse(ReservationEntity reservation) {
        return reservationMapper.toResponse(reservation);
    }


}
