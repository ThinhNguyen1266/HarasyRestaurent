package group5.swp.HarasyProject.controller;

import group5.swp.HarasyProject.dto.request.table.TableRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.table.TableResponse;
import group5.swp.HarasyProject.service.TableService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class TableController {
    TableService tableService;

    @PostMapping("/table")
    public ResponseEntity<ApiResponse<Set<TableResponse>> > createTable(@RequestBody Set<TableRequest> tableRequests) {
        return ResponseEntity.ok(tableService.createTable(tableRequests));
    }

    @GetMapping("/tables")
    public ResponseEntity<ApiResponse<List<TableResponse>>> getAllTable() {
        return ResponseEntity.ok(tableService.getAllTable());
    }
    @GetMapping("/table/{tableId}")
    public ResponseEntity<ApiResponse<TableResponse>> getTableById(@PathVariable Integer tableId) {
        return ResponseEntity.ok(tableService.getTableById(tableId));
    }

    @GetMapping("/tables/{branchId}")
    public ResponseEntity<ApiResponse<List<TableResponse>>> getAllTableByBranch(@PathVariable Integer branchId) {
        return ResponseEntity.ok(tableService.getAllTableByBranch(branchId));
    }

    @PutMapping("/table/{tableId}")
    public ResponseEntity<ApiResponse<TableResponse>> updateTable(@PathVariable Integer tableId, @RequestBody TableRequest tableRequest) {
        return ResponseEntity.ok(tableService.updateTable(tableId, tableRequest));
    }

    @DeleteMapping("/table/{tableId}")
    public ResponseEntity<ApiResponse<Void>> deleteTable(@PathVariable Integer tableId) {
        return ResponseEntity.ok(tableService.deleteTable(tableId));
    }
}
