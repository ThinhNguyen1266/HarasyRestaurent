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

    /**
     * Get all reservations
     * @return ResponseEntity containing the list of ReservationResponse
     */
    @GetMapping("/reservations")
    public ResponseEntity<ApiResponse<List<ReservationResponse>>> getAllReservations() {
        ApiResponse<List<ReservationResponse>> response = reservationService.getApprovedReservations();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/search")
    public ResponseEntity<ApiResponse<List<ReservationResponse>>> searchReservationsByCustomerName(
            @RequestBody Map<String, String> requestBody) {
        String customerName = requestBody.get("customerName").trim();
        ApiResponse<List<ReservationResponse>> response = reservationService.searchReservationsByCustomerName(customerName);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/reservation/{id}")
    public ResponseEntity<ApiResponse<ReservationResponse>> updateReservationStatus(
            @PathVariable Integer id) {
        ApiResponse<ReservationResponse> response = reservationService.updateReservationStatus(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
