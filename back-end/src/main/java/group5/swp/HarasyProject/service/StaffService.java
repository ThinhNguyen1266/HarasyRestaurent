package group5.swp.HarasyProject.service;

import group5.swp.HarasyProject.dto.request.staff.StaffRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.staff.StaffResponse;
import group5.swp.HarasyProject.enums.Account.AccountStatus;
import group5.swp.HarasyProject.enums.Account.StaffRole;

import java.util.List;

public interface StaffService {
    ApiResponse<List<StaffResponse>> getAllStaff();
    ApiResponse<List<StaffResponse>> getStaffSortedByRole();
    ApiResponse<StaffResponse> updateStaffInfo(int staffId, StaffRequest staffRequest);
    ApiResponse<List<StaffResponse>> getStaffByBranch(int branchId);
    ApiResponse<List<StaffResponse>> searchStaffByRoleAndStatus(StaffRole role, AccountStatus status);

}
