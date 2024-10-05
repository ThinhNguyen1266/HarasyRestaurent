package group5.swp.HarasyProject.service;

import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.branch.BranchListResponse;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public interface BranchService {
    ApiResponse<List<BranchListResponse>> getAllBranches();
}
