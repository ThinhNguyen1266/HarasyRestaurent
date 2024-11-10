package group5.swp.HarasyProject.controller;

import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.staff.StaffResponse;
import group5.swp.HarasyProject.enums.Account.AccountStatus;
import group5.swp.HarasyProject.enums.Account.StaffRole;
import group5.swp.HarasyProject.service.StaffService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/staff/search")
    public ApiResponse<List<StaffResponse>> searchStaffByRoleAndStatus(
            @RequestParam(required = false) StaffRole role,
            @RequestParam(required = false) AccountStatus status) {
        return staffService.searchStaffByRoleAndStatus(role, status);
    }
}
