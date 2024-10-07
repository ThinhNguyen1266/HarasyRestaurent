package group5.swp.HarasyProject.service;

import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.staff.StaffResponse;
import group5.swp.HarasyProject.enums.Account.StaffRole;

import java.util.List;

public interface StaffService {
    ApiResponse<List<StaffResponse>> getActiveStaff();
    ApiResponse<List<StaffResponse>> getStaffSortedByRole();
    ApiResponse<List<StaffResponse>> searchStaffByRole(StaffRole role);
}
