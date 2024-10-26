package group5.swp.HarasyProject.controller;

import group5.swp.HarasyProject.dto.request.table.TableRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.table.TableResponse;
import group5.swp.HarasyProject.service.TableService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import org.springframework.web.bind.annotation.*;



@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class TableController {

    TableService tableService;


    @PutMapping("/table/{id}")
    ApiResponse<TableResponse> updateTable(@PathVariable int id, @RequestBody TableRequest request) {
        return tableService.updateTable(id,request);
    }

    @DeleteMapping("/table/{id}")
    ApiResponse<?> deleteTable(@PathVariable int id) {
        return tableService.deleteTable(id);
    }

}
