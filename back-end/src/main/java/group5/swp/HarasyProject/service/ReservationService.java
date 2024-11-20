package group5.swp.HarasyProject.service;

import group5.swp.HarasyProject.dto.response.reservation.ReservationResponse;
import group5.swp.HarasyProject.entity.reservation.ReservationEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public interface ReservationService {
    List<String> getAvailableTime(int branchId, String timeSlots, LocalDate date, int amountGuest);
    Page<ReservationEntity> getAllReservationsInBranch(Pageable pageable,Boolean isHistory,int branchId);
    Page<ReservationEntity> getAllCusReservations(Pageable pageable,int customerId);

    ReservationEntity getReservationById(int id);
    ReservationEntity saveReservation(ReservationEntity reservation);

    ReservationResponse toReservationResponse(ReservationEntity reservation);
}
