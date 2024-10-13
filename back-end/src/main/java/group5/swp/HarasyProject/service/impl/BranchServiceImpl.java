package group5.swp.HarasyProject.service.impl;

import group5.swp.HarasyProject.dto.request.branch.CreateBranchRequest;
import group5.swp.HarasyProject.dto.request.branch.UpdateBranchRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.branch.BranchInfoResponse;
import group5.swp.HarasyProject.dto.response.branch.BranchListResponse;
import group5.swp.HarasyProject.entity.branch.BranchEntity;
import group5.swp.HarasyProject.entity.branch.TableEntity;
import group5.swp.HarasyProject.enums.ErrorCode;
import group5.swp.HarasyProject.enums.Status;
import group5.swp.HarasyProject.exception.AppException;
import group5.swp.HarasyProject.mapper.BranchMapper;
import group5.swp.HarasyProject.mapper.TableMapper;
import group5.swp.HarasyProject.repository.BranchRepository;
import group5.swp.HarasyProject.service.BranchService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@RequiredArgsConstructor
public class BranchServiceImpl implements BranchService {

    BranchRepository branchRepository;
    BranchMapper branchMapper;
    TableMapper tableMapper;
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
        if(branchRepository.existsByName(request.getName())) {
            throw new AppException(ErrorCode.BRANCH_IS_EXIST);
        }
        BranchEntity branch = new BranchEntity();
        branch = branchMapper.toBranchEntity(request, branch);
        Set<TableEntity> tables = request.getTables().stream().map(tableMapper::toTable).collect(Collectors.toSet());
        branch.setTables(tables);
        branch = branchRepository.save(branch);
        BranchInfoResponse info = branchMapper.toBranchInfoResponse(branch);
        return ApiResponse.<BranchInfoResponse>builder()
                .data(info)
                .build();
    }


    @Override
    public ApiResponse<BranchInfoResponse> updateBranch(Integer id , UpdateBranchRequest request){
        if (branchRepository.existsByNameAndIdNot(request.getName(), id)) {
            throw new AppException(ErrorCode.BRANCH_IS_EXIST);
        }
        BranchEntity branch = branchRepository.findById(id).orElseThrow(()->new AppException(ErrorCode.BRANCH_NOT_FOUND));
        branch = branchMapper.updateEntity(request, branch);
        branch = branchRepository.save(branch);
        BranchInfoResponse info = branchMapper.toBranchInfoResponse(branch);
        return ApiResponse.<BranchInfoResponse>builder()
                .data(info)
                .build();
    }


    @Override
    public ApiResponse<?> deleteBranch(Integer id) {
        BranchEntity branch = branchRepository.findById(id).orElseThrow(()->new AppException(ErrorCode.BRANCH_NOT_FOUND));
        branchRepository.delete(branch);
        return ApiResponse.builder()
                .build();
    }
}
