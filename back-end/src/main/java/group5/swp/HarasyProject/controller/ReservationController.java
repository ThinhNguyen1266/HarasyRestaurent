package group5.swp.HarasyProject.controller;

import group5.swp.HarasyProject.dto.request.reservation.CheckReserveTimeRequest;
import group5.swp.HarasyProject.dto.request.reservation.CustomerReserveRequest;
import group5.swp.HarasyProject.dto.request.reservation.ReservationRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.reservation.AvailableReserveTimeResponse;
import group5.swp.HarasyProject.dto.response.reservation.ReservationResponse;
import group5.swp.HarasyProject.service.BusinessManagementService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ReservationController {
    BusinessManagementService businessManagementService;


    @GetMapping("/reserve/availableTime")
    ApiResponse<AvailableReserveTimeResponse> getAvailableReserveTime(@RequestBody CheckReserveTimeRequest request) {
        return businessManagementService.getAvailableReserveTime(request);
    }


    @GetMapping("/reserve")
    ApiResponse<Page<ReservationResponse>> getAllReservation(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "desc") String direction,
            @RequestParam(defaultValue = "false") boolean isHistory) {
        return null;
    }


    @GetMapping("/reserve/{id}")
    ApiResponse<ReservationResponse> getReservation(@PathVariable int id) {
        return businessManagementService.getReservation(id);
    }



    @PostMapping("/cusReserve")
    ApiResponse<ReservationResponse> reserve(@RequestBody CustomerReserveRequest request) {
        return businessManagementService.customerReservation(request);
    }

    @PostMapping("/reserve")
    ApiResponse<ReservationResponse> reserve(@RequestBody ReservationRequest request) {
        return businessManagementService.createReservation(request);
    }

    @PutMapping("/reserve/{id}")
    ApiResponse<ReservationResponse> updateReserve(@RequestBody ReservationRequest request,
                                                   @PathVariable int id) {
        return businessManagementService.updateReservation(request, id);
    }

}
