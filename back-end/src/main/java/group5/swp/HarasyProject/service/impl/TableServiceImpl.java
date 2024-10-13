package group5.swp.HarasyProject.service.impl;

import group5.swp.HarasyProject.dto.request.table.CreateTableRequest;
import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.table.TableResponse;
import group5.swp.HarasyProject.mapper.TableMapper;
import group5.swp.HarasyProject.repository.TableRepository;
import group5.swp.HarasyProject.service.TableService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@RequiredArgsConstructor
public class TableServiceImpl implements TableService {

}
