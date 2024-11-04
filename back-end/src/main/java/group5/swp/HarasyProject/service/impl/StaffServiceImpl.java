package group5.swp.HarasyProject.service.impl;

import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.staff.StaffResponse;
import group5.swp.HarasyProject.entity.account.StaffAccountEntity;
import group5.swp.HarasyProject.enums.Account.AccountStatus;
import group5.swp.HarasyProject.enums.Account.StaffRole;
import group5.swp.HarasyProject.mapper.StaffMapper;
import group5.swp.HarasyProject.repository.StaffAccountRepository;
import group5.swp.HarasyProject.service.StaffService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Collections;
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
        List<StaffAccountEntity> activeStaff = staffAccountRepository.findAllByAccount_Status(AccountStatus.ACTIVE);

        List<StaffResponse> staffResponses = activeStaff.stream()
                .map(staffMapper::toResponse)
                .collect(Collectors.toList());

        if (staffResponses.isEmpty()) {
            return ApiResponse.<List<StaffResponse>>builder()
                    .success(false)
                    .message("No active staff members found.")
                    .code(404)
                    .data(Collections.emptyList())
                    .build();
        }

        return ApiResponse.<List<StaffResponse>>builder()
                .data(staffResponses)
                .message("Active staff members retrieved successfully.")
                .build();
    }

    @Override
    public ApiResponse<List<StaffResponse>> getStaffSortedByRole() {
        List<StaffAccountEntity> staffSortedByRole = staffAccountRepository.findAllByOrderByRoleAsc();

        List<StaffResponse> staffResponses = staffSortedByRole.stream()
                .map(staffMapper::toResponse)
                .collect(Collectors.toList());

        if (staffResponses.isEmpty()) {
            return ApiResponse.<List<StaffResponse>>builder()
                    .success(false)
                    .message("No staff members found.")
                    .code(404)
                    .data(Collections.emptyList())
                    .build();
        }

        return ApiResponse.<List<StaffResponse>>builder()
                .data(staffResponses)
                .message("Staff members sorted by role retrieved successfully.")
                .build();
    }

    @Override
    public ApiResponse<List<StaffResponse>> searchStaffByRole(StaffRole role) {
        List<StaffAccountEntity> staffByRole = staffAccountRepository.findAllByRole(role);

        List<StaffResponse> staffResponses = staffByRole.stream()
                .map(staffMapper::toResponse)
                .collect(Collectors.toList());

        if (staffResponses.isEmpty()) {
            return ApiResponse.<List<StaffResponse>>builder()
                    .success(false)
                    .message("No staff members found for the specified role.")
                    .code(404)
                    .data(Collections.emptyList())
                    .build();
        }

        return ApiResponse.<List<StaffResponse>>builder()
                .data(staffResponses)
                .message("Staff members with specified role retrieved successfully.")
                .build();
    }
}
