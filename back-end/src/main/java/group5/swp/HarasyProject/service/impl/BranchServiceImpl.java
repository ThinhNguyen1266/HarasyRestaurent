package group5.swp.HarasyProject.service.impl;

import group5.swp.HarasyProject.dto.request.branch.CreateBranchRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.branch.BranchInfoResponse;
import group5.swp.HarasyProject.dto.response.branch.BranchListResponse;
import group5.swp.HarasyProject.entity.branch.BranchEntity;
import group5.swp.HarasyProject.enums.ErrorCode;
import group5.swp.HarasyProject.enums.Status;
import group5.swp.HarasyProject.exception.AppException;
import group5.swp.HarasyProject.mapper.BranchMapper;
import group5.swp.HarasyProject.repository.BranchRepository;
import group5.swp.HarasyProject.service.BranchService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Set;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@RequiredArgsConstructor
public class BranchServiceImpl implements BranchService {

    BranchRepository branchRepository;
    BranchMapper branchMapper;

    @Override
    public ApiResponse<BranchInfoResponse> getBranchInfo(int branchId) {
        BranchEntity branch = branchRepository.findById(branchId)
                .orElseThrow(()->new AppException(ErrorCode.BRANCH_NOT_FOUND));
        BranchInfoResponse info = branchMapper.toBranchInfoResponse(branch);
        System.out.println(info);
        return ApiResponse.<BranchInfoResponse>builder()
                .data(info)
                .build();
    }

    @Override
    public ApiResponse<Set<BranchListResponse>> getAllBranches() {
        Set<BranchEntity> branches = branchRepository.findAllByStatus(Status.ACTIVE);
        Set<BranchListResponse> branchesListResponses = branchMapper.toBranchListResponse(branches);
        return ApiResponse.<Set<BranchListResponse>>builder()
                .data(branchesListResponses)
                .build();
    }

    @Override
    public ApiResponse<BranchInfoResponse> createBranch(CreateBranchRequest request) {
        BranchEntity branch  = branchMapper.toBranchEntity(request);
        branch = branchRepository.save(branch);
        BranchInfoResponse info = branchMapper.toBranchInfoResponse(branch);
        return ApiResponse.<BranchInfoResponse>builder()
                .data(info)
                .build();
    }
}
