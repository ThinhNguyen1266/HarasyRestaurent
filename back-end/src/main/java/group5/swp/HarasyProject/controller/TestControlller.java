package group5.swp.HarasyProject.controller;


import group5.swp.HarasyProject.dto.request.reservation.CheckReserveTimeRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.reservation.AvailableReserveTimeResponse;
import group5.swp.HarasyProject.service.BusinessManagementService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class TestControlller {

    BusinessManagementService businessManagementService;


    @GetMapping("/")
    public ApiResponse<AvailableReserveTimeResponse> index(@RequestBody CheckReserveTimeRequest request) {
        return  businessManagementService.getAvailableReserveTime(request);
    }



}
