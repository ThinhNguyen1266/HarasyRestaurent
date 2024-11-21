package group5.swp.HarasyProject.service;

import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.reservation.ReservationTypeResonse;
import group5.swp.HarasyProject.entity.reservation.ReservationTypeEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ReservationTypeService {
    ReservationTypeEntity getReservationTypeById(int id);
    ApiResponse<List<ReservationTypeResonse>> getAllReservationType();
}
