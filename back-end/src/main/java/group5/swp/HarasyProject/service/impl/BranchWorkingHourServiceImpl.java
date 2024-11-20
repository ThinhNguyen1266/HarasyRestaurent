package group5.swp.HarasyProject.service.impl;

import group5.swp.HarasyProject.dto.request.branch.BranchWorkingHourRequest;
import group5.swp.HarasyProject.entity.branch.BranchWorkingHourEntity;
import group5.swp.HarasyProject.mapper.BranchWorkingHourMapper;
import group5.swp.HarasyProject.repository.BranchWorkingHourRepository;
import group5.swp.HarasyProject.service.BranchWorkingHourService;
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
public class BranchWorkingHourServiceImpl implements BranchWorkingHourService {
    BranchWorkingHourRepository branchWorkingHourRepository;
    BranchWorkingHourMapper branchWorkingHourMapper;

    @Override
    public List<BranchWorkingHourEntity> saveUpdate(List<BranchWorkingHourEntity> hours) {
        return branchWorkingHourRepository.saveAll(hours);
    }

    @Override
    public BranchWorkingHourEntity mapWorkingHour(BranchWorkingHourRequest workingHour) {
        return branchWorkingHourMapper.toEntity(workingHour);
    }

    @Override
    public BranchWorkingHourEntity mapUpdateWorkingHour(BranchWorkingHourRequest updateHour, BranchWorkingHourEntity workingHour) {
        return branchWorkingHourMapper.updateEntity(updateHour, workingHour);
    }

    @Override
    public List<BranchWorkingHourEntity> mapWorkingHours(List<BranchWorkingHourRequest> workingHours) {
        return workingHours.stream().map(this::mapWorkingHour).toList();
    }
}
