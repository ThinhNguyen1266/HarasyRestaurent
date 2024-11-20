package group5.swp.HarasyProject.service;

import group5.swp.HarasyProject.dto.request.table.TableRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.table.TableResponse;
import group5.swp.HarasyProject.entity.branch.TableEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public interface TableService {
    ApiResponse<?> deleteTable(int tableId);
    ApiResponse<TableResponse> updateTable(int tableId, TableRequest request);
    List<TableEntity> toTableList(List<TableRequest> request);
    void saveUpdate(List<TableEntity> tables);
    ApiResponse<List<TableResponse>> getTablesInBranch(int branchId);
    TableEntity mapUpdateTable(TableRequest updateTable, TableEntity oldTable);
    List<TableEntity> getTables(List<Integer> tableIds);
    List<TableEntity> getAllTablesAvailableToReserve(int branchId, LocalDate date, LocalTime time);
    TableResponse toResponse(TableEntity table);
};
