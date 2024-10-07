package group5.swp.HarasyProject.service.impl;

import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.reservation.ReservationResponse;
import group5.swp.HarasyProject.entity.reservation.ReservationEntity;
import group5.swp.HarasyProject.enums.ReservationStatus;
import group5.swp.HarasyProject.mapper.ReservationMapper;

import group5.swp.HarasyProject.repository.ReservationRepository;
import group5.swp.HarasyProject.service.ReservationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
public class ReservationServiceImpl implements ReservationService {

    ReservationRepository reservationRepository;
    ReservationMapper reservationMapper;

    @Override
    public ApiResponse<List<ReservationResponse>> getApprovedReservations() {
        List<ReservationEntity> approvedReservations = reservationRepository.findAllByStatus(ReservationStatus.APPROVED);

        List<ReservationResponse> reservationResponses = approvedReservations.stream()
                .map(reservationMapper::toResponse)
                .collect(Collectors.toList());

        return ApiResponse.<List<ReservationResponse>>builder()
                .data(reservationResponses)
                .build();
    }

    @Override
    public ApiResponse<List<ReservationResponse>> searchReservationsByCustomerName(String customerName) {
        // Fetch reservations based on the customer name
        List<ReservationEntity> reservations = reservationRepository.findByCustomerName(customerName); // Assuming this method exists in the repository

        if (reservations.isEmpty()) {
            return ApiResponse.<List<ReservationResponse>>builder()
                    .success(false)
                    .message("No reservations found for customer: " + customerName)
                    .code(404)
                    .build();
        }

        // Convert to ReservationResponse nếu tìm thấy
        List<ReservationResponse> reservationResponses = reservations.stream()
                .map(reservationMapper::toResponse)
                .collect(Collectors.toList());

        return ApiResponse.<List<ReservationResponse>>builder()
                .success(true)
                .message("Reservations found for customer: " + customerName)
                .data(reservationResponses)
                .build();
    }

    @Override
    public ApiResponse<ReservationResponse> updateReservationStatus(Integer reservationId) {
        // Fetch reservation by ID
        ReservationEntity reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new IllegalArgumentException("Reservation not found with ID: " + reservationId));

        // Check if the current status is APPROVED
        if (reservation.getStatus() != ReservationStatus.APPROVED) {
            return ApiResponse.<ReservationResponse>builder()
                    .success(false)
                    .message("Reservation status can only be updated from APPROVED to DONE")
                    .code(400) // Bad Request
                    .build();
        }

        // Update status to DONE
        reservation.setStatus(ReservationStatus.DONE);
        reservationRepository.save(reservation);

        // Convert to ReservationResponse
        ReservationResponse reservationResponse = reservationMapper.toResponse(reservation);

        return ApiResponse.<ReservationResponse>builder()
                .success(true)
                .message("Reservation status updated successfully")
                .data(reservationResponse)
                .build();
    }
}
