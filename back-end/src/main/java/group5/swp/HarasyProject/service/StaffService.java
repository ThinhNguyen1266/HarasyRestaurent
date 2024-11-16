package group5.swp.HarasyProject.service;

import group5.swp.HarasyProject.dto.request.staff.StaffRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.staff.StaffResponse;
import group5.swp.HarasyProject.enums.Account.StaffRole;

import java.util.List;

public interface StaffService {
    ApiResponse<List<StaffResponse>> getAllStaff();
    ApiResponse<List<StaffResponse>> getStaffSortedByRole();
    ApiResponse<List<StaffResponse>> searchStaffByRole(StaffRole role);
    ApiResponse<StaffResponse> updateStaffInfo(int staffId, StaffRequest staffRequest);
    ApiResponse<StaffResponse> deactiveStaff(int staffId);
    ApiResponse<StaffResponse> activeStaff(int staffId);
    ApiResponse<StaffResponse> deleteStaff(int staffId);
}
