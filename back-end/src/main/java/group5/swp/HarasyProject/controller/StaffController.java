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
    public ResponseEntity<ApiResponse<List<StaffResponse>>> getActiveStaff() {
        ApiResponse<List<StaffResponse>> response = staffService.getActiveStaff();
        return ResponseEntity.status(response.getCode()).body(response);
    }

    @GetMapping("/sorted")
    public ResponseEntity<ApiResponse<List<StaffResponse>>> getStaffSortedByRole() {
        ApiResponse<List<StaffResponse>> response = staffService.getStaffSortedByRole();
        return ResponseEntity.status(response.getCode()).body(response);
    }

    @GetMapping("/staff/{role}")
    public ResponseEntity<ApiResponse<List<StaffResponse>>> searchStaffByRole(@PathVariable StaffRole role) {
        ApiResponse<List<StaffResponse>> response = staffService.searchStaffByRole(role);
        return ResponseEntity.ok(response);
    }
}
