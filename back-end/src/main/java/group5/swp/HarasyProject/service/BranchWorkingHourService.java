package group5.swp.HarasyProject.service;

import group5.swp.HarasyProject.dto.request.branch.BranchWorkingHourRequest;
import group5.swp.HarasyProject.entity.branch.BranchWorkingHourEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BranchWorkingHourService {
    List<BranchWorkingHourEntity> saveUpdate(List<BranchWorkingHourEntity> hours);
    BranchWorkingHourEntity mapWorkingHour(BranchWorkingHourRequest workingHour);
    BranchWorkingHourEntity mapUpdateWorkingHour(BranchWorkingHourRequest updateHour,
                                                 BranchWorkingHourEntity workingHour);
    List<BranchWorkingHourEntity> mapWorkingHours(List<BranchWorkingHourRequest> workingHours);
}
