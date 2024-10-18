package group5.swp.HarasyProject.service;

import group5.swp.HarasyProject.dto.request.table.TableRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.table.TableResponse;
import org.springframework.stereotype.Service;

@Service
public interface TableService {

    ApiResponse<TableResponse> updateTable(int tableId, TableRequest request);


}
