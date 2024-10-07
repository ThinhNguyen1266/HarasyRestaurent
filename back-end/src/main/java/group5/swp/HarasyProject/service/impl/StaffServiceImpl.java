package group5.swp.HarasyProject.service.impl;

import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.staff.StaffResponse;
import group5.swp.HarasyProject.entity.account.StaffAccountEntity;
import group5.swp.HarasyProject.enums.Account.AccountStatus;
import group5.swp.HarasyProject.enums.Account.StaffRole;
import group5.swp.HarasyProject.enums.Status;
import group5.swp.HarasyProject.mapper.StaffMapper;
import group5.swp.HarasyProject.repository.StaffAccountRepository;
import group5.swp.HarasyProject.service.StaffService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@Slf4j
public class StaffServiceImpl implements StaffService {

    StaffAccountRepository staffAccountRepository;
    StaffMapper staffMapper;

    @Override
    public ApiResponse<List<StaffResponse>> getActiveStaff() {
        // Retrieve all staff with account status ACTIVE
        List<StaffAccountEntity> activeStaff = staffAccountRepository.findAllByAccount_Status(AccountStatus.ACTIVE);

        // Map the staff entities to the response DTO
        List<StaffResponse> staffResponses = activeStaff.stream()
                .map(staffMapper::toResponse)
                .collect(Collectors.toList());

        return ApiResponse.<List<StaffResponse>>builder()
                .data(staffResponses)
                .build();
    }




    @Override
    public ApiResponse<List<StaffResponse>> getStaffSortedByRole() {
        // Retrieve all staff and order them by role
        List<StaffAccountEntity> staffSortedByRole = staffAccountRepository.findAllByOrderByRoleAsc();

        // Map the staff entities to the response DTO
        List<StaffResponse> staffResponses = staffSortedByRole.stream()
                .map(staffMapper::toResponse)
                .collect(Collectors.toList());

        return ApiResponse.<List<StaffResponse>>builder()
                .data(staffResponses)
                .build();
    }

    @Override
    public ApiResponse<List<StaffResponse>> searchStaffByRole(StaffRole role) {
        List<StaffAccountEntity> staffByRole = staffAccountRepository.findAllByRole(role);

        List<StaffResponse> staffResponses = staffByRole.stream()
                .map(staffMapper::toResponse)
                .collect(Collectors.toList());

        return ApiResponse.<List<StaffResponse>>builder()
                .data(staffResponses)
                .build();
    }
}
