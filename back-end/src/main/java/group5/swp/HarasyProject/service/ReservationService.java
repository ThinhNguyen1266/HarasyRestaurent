package group5.swp.HarasyProject.service;

import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.reservation.ReservationResponse;

import java.util.List;

public interface ReservationService {
    ApiResponse<List<ReservationResponse>> getApprovedReservations();
    ApiResponse<List<ReservationResponse>> searchReservationsByCustomerName(String customerName);
    ApiResponse<ReservationResponse> updateReservationStatus(Integer reservationId);
}
