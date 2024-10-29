package group5.swp.HarasyProject.service.impl;

import group5.swp.HarasyProject.dto.request.branch.CreateBranchRequest;
import group5.swp.HarasyProject.dto.request.branch.UpdateBranchRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.branch.BranchInfoResponse;
import group5.swp.HarasyProject.dto.response.branch.BranchListResponse;
import group5.swp.HarasyProject.dto.response.menu.MenuResponse;
import group5.swp.HarasyProject.dto.response.table.TableResponse;
import group5.swp.HarasyProject.entity.branch.BranchEntity;
import group5.swp.HarasyProject.entity.branch.TableEntity;
import group5.swp.HarasyProject.entity.menu.MenuEntity;
import group5.swp.HarasyProject.enums.ErrorCode;
import group5.swp.HarasyProject.enums.Status;
import group5.swp.HarasyProject.enums.TableStatus;
import group5.swp.HarasyProject.exception.AppException;
import group5.swp.HarasyProject.mapper.BranchMapper;
import group5.swp.HarasyProject.mapper.MenuMapper;
import group5.swp.HarasyProject.mapper.TableMapper;
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
    TableMapper tableMapper;
    MenuMapper menuMapper;

    @Override
    public ApiResponse<BranchInfoResponse> getBranchInfo(int branchId) {
        BranchEntity branch = branchRepository.findById(branchId)
                .orElseThrow(() -> new AppException(ErrorCode.BRANCH_NOT_FOUND));
        BranchInfoResponse info = branchMapper.toBranchInfoResponse(branch);
        System.out.println(info);
        return ApiResponse.<BranchInfoResponse>builder()
                .data(info)
                .build();
    }

    @Override
    public ApiResponse<List<BranchInfoResponse>> getAllBranches(boolean isStaff) {
        List<BranchEntity> branches = branchRepository.findAll();
        if (!isStaff) {
            branches = branches
                    .stream().filter(branchEntity -> branchEntity.getStatus().equals(Status.ACTIVE))
                    .toList();
        }
        List<BranchInfoResponse> branchesListResponses = branchMapper.toBranchInfoResponses(branches);
        return ApiResponse.<List<BranchInfoResponse>>builder()
                .data(branchesListResponses)
                .build();
    }

    @Override
    public ApiResponse<BranchInfoResponse> createBranch(CreateBranchRequest request) {
        if (branchRepository.existsByName(request.getName())) {
            throw new AppException(ErrorCode.BRANCH_IS_EXIST);
        }
        BranchEntity branch = new BranchEntity();
        branch = branchMapper.toBranchEntity(request, branch);
        List<TableEntity> tables = null;
        if(request.getTables()!=null){
            tables = request.getTables()
                    .stream().map(createTableRequest -> tableMapper.toTable(createTableRequest, new TableEntity()))
                    .toList();
        }
        branch.setTables(tables);
        List<MenuEntity> menus = null;
        if(request.getMenus()!=null){
            menus = menuMapper.toMenuEntities(request.getMenus());
        }
        branch.setMenus(menus);
        branch = branchRepository.save(branch);
        BranchInfoResponse info = branchMapper.toBranchInfoResponse(branch);
        return ApiResponse.<BranchInfoResponse>builder()
                .data(info)
                .build();
    }


    @Override
    public ApiResponse<BranchInfoResponse> updateBranch(Integer id, UpdateBranchRequest request) {
        if (branchRepository.existsByNameAndIdNot(request.getName(), id)) {
            throw new AppException(ErrorCode.BRANCH_IS_EXIST);
        }
        BranchEntity branch = branchRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.BRANCH_NOT_FOUND));
        branch = branchMapper.updateEntity(request, branch);
        branch = branchRepository.save(branch);
        BranchInfoResponse info = branchMapper.toBranchInfoResponse(branch);
        return ApiResponse.<BranchInfoResponse>builder()
                .data(info)
                .build();
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
    public ApiResponse<List<TableResponse>> getAllTablesInBranch(int branchId) {
        BranchEntity branch = branchRepository.findById(branchId)
                .orElseThrow(() -> new AppException(ErrorCode.BRANCH_NOT_FOUND));
        List<TableEntity> tables = branch.getTables()
                .stream().filter(tableEntity -> !tableEntity.getStatus().equals(TableStatus.DELETED))
                .toList();
        List<TableResponse> tableResponses = tableMapper.toSetResponse(tables);
        return ApiResponse.<List<TableResponse>>builder()
                .data(tableResponses)
                .build();
    }

    @Override
    public ApiResponse<BranchInfoResponse> addTables(Integer branchId, CreateBranchRequest request) {
        BranchEntity branch = branchRepository.findById(branchId)
                .orElseThrow(() -> new AppException(ErrorCode.BRANCH_NOT_FOUND));
        List<TableEntity> tables = request.getTables()
                .stream().map(tableRequest -> tableMapper.toTable(tableRequest, new TableEntity()))
                .toList();
        for (TableEntity tableEntity : tables) {
            branchMapper.addTables(tableEntity, branch);
        }
        branch = branchRepository.save(branch);
        BranchInfoResponse info = branchMapper.toBranchInfoResponse(branch);
        return ApiResponse.<BranchInfoResponse>builder()
                .data(info)
                .build();
    }

    @Override
    public ApiResponse<List<MenuResponse>> getAllMenusInBranch(int branchId) {
        BranchEntity branch = branchRepository.findById(branchId)
                .orElseThrow(() -> new AppException(ErrorCode.BRANCH_NOT_FOUND));
        List<MenuEntity> menus = branch.getMenus();
        List<MenuResponse> menuResponses = menus
                .stream().map(menuMapper::toMenuResponse)
                .toList();
        return ApiResponse.<List<MenuResponse>>builder()
                .data(menuResponses)
                .build();
    }

    @Override
    public ApiResponse<BranchInfoResponse> addMenus(Integer branchId, CreateBranchRequest request) {
        BranchEntity branch = branchRepository.findById(branchId)
                .orElseThrow(() -> new AppException(ErrorCode.BRANCH_NOT_FOUND));
        List<MenuEntity> menus = menuMapper.toMenuEntities(request.getMenus());
        for(MenuEntity menuEntity : menus) {
            branchMapper.addMenus(menuEntity, branch);
        }
        branch = branchRepository.save(branch);
        BranchInfoResponse info = branchMapper.toBranchInfoResponse(branch);
        return ApiResponse.<BranchInfoResponse>builder()
                .data(info)
                .build();
    }
}
