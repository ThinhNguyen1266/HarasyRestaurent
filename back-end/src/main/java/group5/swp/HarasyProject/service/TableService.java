package group5.swp.HarasyProject.service;

import group5.swp.HarasyProject.dto.request.table.TableRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.table.TableResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public interface TableService {
    ApiResponse<Set<TableResponse>>  createTable(Set<TableRequest> tableRequests);
    ApiResponse<List<TableResponse>> getAllTable();
    ApiResponse<List<TableResponse>> getAllTableByBranch(Integer branchId);
    ApiResponse<TableResponse> getTableById(Integer tableId);
    ApiResponse<TableResponse> updateTable(Integer tableId, TableRequest tableRequest);
    ApiResponse<Void> deleteTable(Integer tableId);
}
