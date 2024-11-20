package group5.swp.HarasyProject.repository;


import group5.swp.HarasyProject.entity.branch.BranchWorkingHourEntity;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
@Repository
public interface BranchWorkingHourRepository extends JpaRepository<BranchWorkingHourEntity,Integer> {
    BranchWorkingHourEntity findBranchWorkingHourEntityByBranchId(int branchId);
}
