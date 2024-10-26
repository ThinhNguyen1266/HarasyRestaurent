package group5.swp.HarasyProject.controller;

import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.staff.StaffResponse;
import group5.swp.HarasyProject.enums.Account.StaffRole;
import group5.swp.HarasyProject.service.StaffService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class StaffController {

    StaffService staffService;

    @GetMapping("/staff")
    public ApiResponse<List<StaffResponse>> getActiveStaff() {
        return staffService.getActiveStaff();
    }

    @GetMapping("/sorted")
    public ApiResponse<List<StaffResponse>> getStaffSortedByRole() {
        return staffService.getStaffSortedByRole();
    }

    @GetMapping("/staff/{role}")
    public ApiResponse<List<StaffResponse>> searchStaffByRole(@PathVariable StaffRole role) {
        return  staffService.searchStaffByRole(role);
    }
}
