package group5.swp.HarasyProject.service.impl;

import group5.swp.HarasyProject.dto.request.branch.BranchInfoRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.branch.BranchInfoHomeResponse;
import group5.swp.HarasyProject.dto.response.branch.BranchResponse;
import group5.swp.HarasyProject.dto.response.branch.BranchesViewResponse;
import group5.swp.HarasyProject.entity.branch.BranchEntity;
import group5.swp.HarasyProject.entity.branch.TableEntity;
import group5.swp.HarasyProject.entity.menu.MenuEntity;
import group5.swp.HarasyProject.exception.ErrorCode;
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


@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@RequiredArgsConstructor
public class BranchServiceImpl implements BranchService {

    BranchRepository branchRepository;
    BranchMapper branchMapper;


    @Override
    public ApiResponse<List<BranchesViewResponse>> getBranchesView() {
        List<BranchEntity> branches = branchRepository.findAll();
        branches = branches
                .stream().filter(branchEntity -> branchEntity.getStatus().equals(Status.ACTIVE))
                .toList();
        List<BranchesViewResponse> responses = branchMapper.toBranchesViewResponse(branches);
        return ApiResponse.<List<BranchesViewResponse>>builder()
                .data(responses)
                .build();
    }

    @Override
    public ApiResponse<BranchInfoHomeResponse> getBranchHomeInfo(int branchId) {
        BranchEntity branch = branchRepository.findById(branchId)
                .orElseThrow(() -> new AppException(ErrorCode.BRANCH_NOT_FOUND));
        BranchInfoHomeResponse info = branchMapper.toBranchInfoHomeResponse(branch);
        return ApiResponse.<BranchInfoHomeResponse>builder()
                .data(info)
                .build();
    }

    @Override
    public ApiResponse<BranchResponse> getBranchResponse(int branchId) {
        BranchEntity branch = branchRepository.findById(branchId)
                .orElseThrow(() -> new AppException(ErrorCode.BRANCH_NOT_FOUND));
        BranchResponse info = branchMapper.toBranchResponse(branch);
        return ApiResponse.<BranchResponse>builder()
                .data(info)
                .build();
    }

    @Override
    public ApiResponse<List<BranchResponse>> getAllBranches(boolean includeAll) {
        List<BranchEntity> branches = branchRepository.findAll();
        if (!includeAll) {
            branches = branches
                    .stream().filter(branchEntity -> !branchEntity.getStatus().equals(Status.DELETED))
                    .toList();
        }
        List<BranchResponse> branchesListResponses = branchMapper.toBranchInfoResponses(branches);
        return ApiResponse.<List<BranchResponse>>builder()
                .data(branchesListResponses)
                .build();
    }

    @Override
    public BranchEntity createBranch(BranchInfoRequest request) {
        if (branchRepository.existsByName(request.getName())) {
            throw new AppException(ErrorCode.BRANCH_EXISTED);
        }
        return branchMapper.toBranchEntity(request);
    }



    @Override
    public BranchEntity updateBranch(Integer branchId, BranchInfoRequest request) {
        BranchEntity branch = branchRepository.findById(branchId)
                .orElseThrow(() -> new AppException(ErrorCode.BRANCH_NOT_FOUND));
        return branchMapper.updateEntity(request,branch);
    }

    @Override
    public ApiResponse<?> deleteBranch(Integer branchId) {
        BranchEntity branch = branchRepository.findById(branchId)
                .orElseThrow(() -> new AppException(ErrorCode.BRANCH_NOT_FOUND));
        branch.setStatus(Status.DELETED);
        branchRepository.save(branch);
        return ApiResponse.builder()
                .build();
    }


    @Override
    public BranchEntity saveBranch(BranchEntity branch) {
        return branchRepository.save(branch);
    }

    @Override
    public void addTables(List<TableEntity> tables, BranchEntity branch) {
        for (TableEntity table : tables) {
            branchMapper.addTables(table, branch);
        }
    }

    @Override
    public void addMenus(List<MenuEntity> menus, BranchEntity branch) {
        for (MenuEntity menu : menus) {
            branchMapper.addMenus(menu, branch);
        }
    }

    @Override
    public BranchResponse toBranchResponse(BranchEntity branch) {
        return branchMapper.toBranchResponse(branch);
    }

    @Override
    public BranchEntity getBranchEntity(int branchId) {
        return branchRepository.findById(branchId)
                .orElseThrow(() -> new AppException(ErrorCode.BRANCH_NOT_FOUND));
    }

}
