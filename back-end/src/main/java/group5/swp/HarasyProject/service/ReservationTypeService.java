package group5.swp.HarasyProject.service;

import group5.swp.HarasyProject.entity.reservation.ReservationTypeEntity;
import org.springframework.stereotype.Service;

@Service
public interface ReservationTypeService {
    ReservationTypeEntity getReservationTypeById(int id);
}
