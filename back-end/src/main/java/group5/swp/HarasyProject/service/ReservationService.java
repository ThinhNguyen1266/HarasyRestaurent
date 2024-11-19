package group5.swp.HarasyProject.service;

import group5.swp.HarasyProject.entity.reservation.ReservationEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public interface ReservationService {

    List<String> getAvailableTime(int branchId, String timeSlots, LocalDate date, int amountGuest);

    ReservationEntity saveReservation(ReservationEntity reservation);
}
