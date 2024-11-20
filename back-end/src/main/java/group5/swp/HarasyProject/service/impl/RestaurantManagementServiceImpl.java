package group5.swp.HarasyProject.service.impl;

import group5.swp.HarasyProject.dto.request.branch.BranchRequest;
import group5.swp.HarasyProject.dto.request.food.FoodRequest;
import group5.swp.HarasyProject.dto.request.menu.FoodInMenuRequest;
import group5.swp.HarasyProject.dto.request.menu.MenuRequest;
import group5.swp.HarasyProject.dto.request.table.TableRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.branch.BranchInfoHomeResponse;
import group5.swp.HarasyProject.dto.response.branch.BranchResponse;
import group5.swp.HarasyProject.dto.response.branch.BranchesViewResponse;
import group5.swp.HarasyProject.dto.response.food.FoodResponse;
import group5.swp.HarasyProject.dto.response.menu.MenuResponse;
import group5.swp.HarasyProject.dto.response.order.OrderResponse;
import group5.swp.HarasyProject.dto.response.table.TableResponse;
import group5.swp.HarasyProject.entity.account.StaffAccountEntity;
import group5.swp.HarasyProject.entity.branch.BranchEntity;
import group5.swp.HarasyProject.entity.branch.TableEntity;
import group5.swp.HarasyProject.entity.menu.MenuEntity;
import group5.swp.HarasyProject.enums.Account.StaffRole;
import group5.swp.HarasyProject.service.*;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@RequiredArgsConstructor
public class RestaurantManagementServiceImpl implements RestaurantManagementService {
    BranchService branchService;
    MenuService menuService;
    FoodService foodService;
    TableService tableService;
    OrderService orderService;
    AccountService accountService;


    @Override
    public ApiResponse<Page<OrderResponse>> getOrdersInBranch(int branchId, Pageable pageable) {
        return ApiResponse.<Page<OrderResponse>>builder()
                .data(orderService.getOrdersByBranchId(branchId, pageable).map(orderService::toResponse))
                .build();
    }

    @Override
    public ApiResponse<List<BranchesViewResponse>> getBranchesView() {
        return branchService.getBranchesView();
    }

    @Override
    public ApiResponse<BranchInfoHomeResponse> getBranchHome(int branchId) {
        return branchService.getBranchHomeInfo(branchId);
    }


    @Override
    public ApiResponse<BranchResponse> getBranch(int branchId) {
        return branchService.getBranchResponse(branchId);
    }

    @Override
    public ApiResponse<List<BranchResponse>> getAllBranches(boolean includeAll) {
        return branchService.getAllBranches(includeAll);
    }

    @Override
    public ApiResponse<?> deleteBranch(Integer branchId) {
        return branchService.deleteBranch(branchId);
    }

    @Override
    @Transactional
    public ApiResponse<BranchResponse> createBranch(BranchRequest request) {
        BranchEntity branch = branchService.createBranch(request.getBranchInfo());
        updateBranchManager(branch, request.getBranchInfo().getManagerId());
        doUpdateIn(request, branch);
        branch = branchService.saveBranch(branch);
        return ApiResponse.<BranchResponse>builder()
                .data(branchService.toBranchResponse(branch))
                .build();
    }

    @Override
    public ApiResponse<List<TableResponse>> getAllTablesInBranch(int branchId) {
        return tableService.getTablesInBranch(branchId);
    }

    @Override
    public ApiResponse<TableResponse> updateTable(int tableId, TableRequest request) {
        return tableService.updateTable(tableId, request);
    }

    @Override
    public ApiResponse<List<MenuResponse>> getAllMenusInBranch(int branchId, boolean isIncludeAll) {
        List<MenuEntity> menus = menuService.getAllMenusInBranch(branchId, isIncludeAll);
        return ApiResponse.<List<MenuResponse>>builder()
                .data(menus
                        .stream().map(menuService::mapMenuResponse)
                        .toList())
                .build();
    }

    @Override
    public ApiResponse<MenuResponse> getMenu(int menuId) {
        return menuService.getMenu(menuId);
    }


    @Override
    public ApiResponse<MenuResponse> addFoodsToMenu(int menuId, FoodInMenuRequest request) {
        menuService.addFood(menuId, request.getFoodIds());
        return getMenu(menuId);
    }

    @Override
    public ApiResponse<MenuResponse> deleteFoodsFromMenu(int menuId, FoodInMenuRequest request) {
        menuService.deleteFood(menuId, request.getFoodIds());
        return getMenu(menuId);
    }

    @Override
    public ApiResponse<List<FoodResponse>> getFoods(boolean includeAll) {
        return foodService.getAllFood(includeAll);
    }

    @Override
    public ApiResponse<FoodResponse> getFood(int foodId) {
        return foodService.getFood(foodId);
    }

    @Override
    @Transactional
    public ApiResponse<BranchResponse> updateBranch(int branchId, BranchRequest request) {
        BranchEntity branch = branchService.updateBranch(branchId, request.getBranchInfo());
        updateBranchManager(branch, request.getBranchInfo().getManagerId());
        doUpdateIn(request, branch);
        branch = branchService.saveBranch(branch);
        return ApiResponse.<BranchResponse>builder()
                .data(branchService.toBranchResponse(branch))
                .build();
    }

    private void updateBranchManager(BranchEntity branch, int managerId) {
        StaffAccountEntity manager = accountService.getStaffAccount(managerId);
        List<StaffAccountEntity> staffs = branch.getStaffs();
        if (staffs != null && !staffs.isEmpty()) {
            for (StaffAccountEntity s : staffs) {
                if (s.getRole().equals(StaffRole.BRANCH_MANAGER)) s = manager;
                return;
            }
        }
        branch.addStaff(manager);
    }


    @Override
    public ApiResponse<FoodResponse> createFood(FoodRequest request) {
        return foodService.createFood(request);
    }

    @Override
    public ApiResponse<FoodResponse> updateFood(int foodId, FoodRequest request) {
        return foodService.updateFood(foodId, request);
    }

    @Override
    public ApiResponse<?> deleteFood(int foodId) {
        return foodService.deleteFood(foodId);
    }

    @Override
    public ApiResponse<?> deleteTable(Integer tableId) {
        return tableService.deleteTable(tableId);
    }

    @Override
    public ApiResponse<?> deleteMenu(Integer menuId) {
        return menuService.deleteMenu(menuId);
    }

    private void doUpdateIn(BranchRequest request, BranchEntity branch) {
        updateInBranchEntity(request, branch);
        addInBranchEntity(request, branch);
    }

    private void addInBranchEntity(BranchRequest request, BranchEntity branch) {
        if (request.getTables() != null && request.getTables().getCreates() != null) {
            List<TableEntity> tables = tableService.toTableList(request.getTables().getCreates());
            if (branch.getTables() == null || branch.getTables().isEmpty()) branch.setTables(tables);
            else {
                branchService.addTables(tables, branch);
            }
        }
        if (request.getMenus() != null && request.getMenus().getCreates() != null) {
            List<MenuEntity> menus = menuService.toMenus(request.getMenus().getCreates());
            if (branch.getMenus() == null || branch.getMenus().isEmpty()) branch.setMenus(menus);
            else {
                branchService.addMenus(menus, branch);
            }
        }
    }


    private void updateInBranchEntity(BranchRequest request, BranchEntity branch) {
        if (request.getTables() != null && request.getTables().getUpdates() != null) {
            List<TableEntity> listUpdateTable = request.getTables().getUpdates()
                    .stream().filter(tableRequest -> isTableInBranch(tableRequest.getId(), branch))
                    .map(tableRequest -> mapUpdateTable(tableRequest, branch.getTables()))
                    .toList();
            tableService.saveUpdate(listUpdateTable);
        }
        if (request.getMenus() != null && request.getMenus().getUpdates() != null) {
            List<MenuEntity> menus = menuService.toMenus(request.getMenus().getUpdates());
            List<MenuEntity> listUpdateMenu = request.getMenus().getUpdates()
                    .stream().filter(menuRequest -> isMenuInBranch(menuRequest.getId(), branch))
                    .map(menuRequest -> mapUpdateMenu(menuRequest, branch.getMenus()))
                    .toList();
            menuService.saveUpdate(listUpdateMenu);
        }
    }

    private boolean isTableInBranch(int tableId, BranchEntity branch) {
        return branch.getTables().stream().anyMatch(table -> table.getId() == tableId);
    }

    private boolean isMenuInBranch(int menuId, BranchEntity branch) {
        return branch.getMenus().stream().anyMatch(menu -> menu.getId() == menuId);
    }

    private TableEntity mapUpdateTable(TableRequest updateTable, List<TableEntity> tables) {
        for (TableEntity tableEntity : tables) {
            if (Objects.equals(tableEntity.getId(), updateTable.getId())) {
                tableEntity = tableService.mapUpdateTable(updateTable, tableEntity);
                return tableEntity;
            }
        }
        return null;
    }

    private MenuEntity mapUpdateMenu(MenuRequest updateMenu, List<MenuEntity> menus) {
        for (MenuEntity menuEntity : menus) {
            if (Objects.equals(menuEntity.getId(), updateMenu.getId())) {
                menuEntity = menuService.mapUpdateMenu(updateMenu, menuEntity);
                return menuEntity;
            }
        }
        return null;
    }
}
