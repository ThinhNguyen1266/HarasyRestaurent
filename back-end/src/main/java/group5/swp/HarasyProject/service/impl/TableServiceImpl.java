package group5.swp.HarasyProject.service.impl;

import group5.swp.HarasyProject.dto.request.table.TableRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.table.TableResponse;
import group5.swp.HarasyProject.entity.branch.TableEntity;
import group5.swp.HarasyProject.enums.ErrorCode;
import group5.swp.HarasyProject.enums.TableStatus;
import group5.swp.HarasyProject.exception.AppException;
import group5.swp.HarasyProject.mapper.TableMapper;
import group5.swp.HarasyProject.repository.TableRepository;
import group5.swp.HarasyProject.service.TableService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@RequiredArgsConstructor
public class TableServiceImpl implements TableService {
    TableRepository tableRepository;

    TableMapper tableMapper;

    @Override
    public ApiResponse<Set<TableResponse>> createTable(Set<TableRequest> tableRequests) {
        Set<TableResponse> tableResponses = new HashSet<>();

        for (TableRequest tableRequest : tableRequests) {
            TableEntity tableEntity = tableMapper.toTableEntity(tableRequest);

            // Get all tables in the same branch
            List<TableResponse> branchTableList = this.getAllTableByBranchFuntion(tableEntity.getBranch().getId());

            // Check if any table in the branch has the same number
            boolean tableExists = branchTableList.stream()
                    .anyMatch(response -> response.getNumber() == tableEntity.getNumber());

            if (tableExists) {
                // Handle duplicate table numbers in the branch (skip or throw exception)
                throw new AppException(ErrorCode.TABLE_EXIST);
            } else {
                // Save the table and add its response to the result set
                TableEntity createdTable = tableRepository.save(tableEntity);
                TableResponse response = tableMapper.toTableResponse(createdTable);
                tableResponses.add(response);
            }
        }

        return ApiResponse.<Set<TableResponse>>builder()
                .data(tableResponses)
                .build();
    }


    @Override
    public ApiResponse<List<TableResponse>> getAllTable() {
        List<TableEntity> tables = tableRepository.findAll().stream().filter(tableEntity -> tableEntity.getStatus()!=TableStatus.DELETED).toList();
        List<TableResponse> tableResponses = tableMapper.toTableResponseList(tables);
        return ApiResponse.<List<TableResponse>>builder()
                .data(tableResponses)
                .build();
    }

    @Override
    public ApiResponse<List<TableResponse>> getAllTableByBranch(Integer branchId) {
        List<TableResponse> tableResponses =this.getAllTableByBranchFuntion(branchId);
        return ApiResponse.<List<TableResponse>>builder()
                .data(tableResponses)
                .build();
    }

    public List<TableResponse> getAllTableByBranchFuntion(Integer branchId) {
        List<TableEntity> tables = tableRepository.findAll();
        List<TableResponse> tableResponses = TableMapper.INSTANCE
                .toTableResponseList(tables.stream()
                        .filter(table -> table.getBranch().getId() == branchId)
                        .collect(Collectors.toList()));
        return tableResponses;
    }

    @Override
    public ApiResponse<TableResponse> getTableById(Integer tableId) {
        Optional<TableEntity> table = tableRepository.findById(tableId);
        if (table.isPresent()) {
            TableResponse tableResponse = tableMapper.toTableResponse(table.get());
            return ApiResponse.<TableResponse>builder()
                    .data(tableResponse)
                    .build();
        }
        throw new AppException(ErrorCode.TABLE_NOT_FOUND);
    }

    @Override
    public ApiResponse<TableResponse> updateTable(Integer tableId, TableRequest tableRequest) {
        Optional<TableEntity> table = tableRepository.findById(tableId);

        if (table.isEmpty()) {
            throw new AppException(ErrorCode.TABLE_NOT_FOUND);
        } else {
            List<TableResponse> branchTableList = this.getAllTableByBranchFuntion(table.get().getBranch().getId());

            // Check if any other table in the branch has the same number
            boolean tableExists = branchTableList.stream()
                    .anyMatch(response -> response.getNumber() == tableRequest.getNumber() && !response.getId().equals(tableId));

            if (tableExists) {
                // Handle the case where another table with the same number exists in the branch
                throw new AppException(ErrorCode.TABLE_EXIST);
            } else {
                // Proceed with updating the table
                TableEntity updatedTable = tableMapper.updateTableEntity(table.get(), tableRequest);
                TableEntity savedTable = tableRepository.save(updatedTable);
                TableResponse response = tableMapper.toTableResponse(savedTable);

                return ApiResponse.<TableResponse>builder()
                        .data(response)
                        .build();
            }
        }
    }


    @Override
    public ApiResponse<Void> deleteTable(Integer tableId) {
        Optional<TableEntity> optionalTable = tableRepository.findById(tableId);

        if (optionalTable.isEmpty()) {
            throw new AppException(ErrorCode.TABLE_NOT_FOUND);
        } else {
            TableEntity tableEntity = optionalTable.get();

            // Use the mapper to set the status to DELETED
            tableMapper.markTableAsDeleted(tableEntity);

            // Save the updated table entity
            TableEntity updatedTable = tableRepository.save(tableEntity);

            // Optionally, convert the updated entity to a response object
            TableResponse response = tableMapper.toTableResponse(updatedTable);

            return ApiResponse.<Void>builder().message("delete success")
                    .build();
        }
    }
}
