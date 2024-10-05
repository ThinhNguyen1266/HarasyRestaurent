package group5.swp.HarasyProject.service.impl;

import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.branch.BranchListResponse;
import group5.swp.HarasyProject.entity.branch.BranchEntity;
import group5.swp.HarasyProject.mapper.BranchMapper;
import group5.swp.HarasyProject.repository.BranchRepository;
import group5.swp.HarasyProject.service.BranchService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@RequiredArgsConstructor
public class BranchServiceImpl implements BranchService {

    BranchRepository branchRepository;
    BranchMapper branchMapper;

    @Override
    public ApiResponse<List<BranchListResponse>> getAllBranches() {
        List<BranchEntity> branches = branchRepository.findAll();
//        List<BranchListResponse> branchListResponses = branches.stream().map(branchMapper::toResponse).toList();
        List<BranchListResponse> branchesListResponses = branchMapper.toBranchListResponse(branches);
        return ApiResponse.<List<BranchListResponse>>builder()
                .data(branchesListResponses)
                .build();
    }
}
