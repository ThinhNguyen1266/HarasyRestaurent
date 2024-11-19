package group5.swp.HarasyProject.service.impl;

import group5.swp.HarasyProject.entity.reservation.ReservationTypeEntity;
import group5.swp.HarasyProject.exception.AppException;
import group5.swp.HarasyProject.exception.ErrorCode;
import group5.swp.HarasyProject.repository.ReservationTypeRepository;
import group5.swp.HarasyProject.service.ReservationTypeService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@RequiredArgsConstructor
public class ReservationTypeServiceImpl implements ReservationTypeService {
    ReservationTypeRepository reservationTypeRepository;

    @Override
    public ReservationTypeEntity getReservationTypeById(int id) {
        return reservationTypeRepository
                .findById(id).orElseThrow(()-> new AppException(ErrorCode.RESERVATION_TYPE_NOT_FOUND));
    }
}
