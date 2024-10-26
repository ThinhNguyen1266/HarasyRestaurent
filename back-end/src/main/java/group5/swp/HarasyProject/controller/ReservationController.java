package group5.swp.HarasyProject.controller;

import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.reservation.ReservationResponse;
import group5.swp.HarasyProject.entity.reservation.ReservationEntity;
import group5.swp.HarasyProject.service.ReservationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController

@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ReservationController {

    ReservationService reservationService;

    @GetMapping("/reservations")
    public ApiResponse<List<ReservationResponse>> getAllReservations() {
        return reservationService.getApprovedReservations();
    }

    @PostMapping("/search")
    public ApiResponse<List<ReservationResponse>> searchReservationsByCustomerName(
            @RequestBody Map<String, String> requestBody) {
        String customerName = requestBody.get("customerName").trim();
        return reservationService.searchReservationsByCustomerName(customerName);
    }

    @PutMapping("/reservation/{id}")
    public ApiResponse<ReservationResponse> updateReservationStatus(
            @PathVariable Integer id) {
        return reservationService.updateReservationStatus(id);
    }

}
