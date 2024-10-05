package group5.swp.HarasyProject.repository;

import group5.swp.HarasyProject.entity.branch.BranchEntity;
import org.springframework.data.jpa.repository.JpaRepository;


public interface BranchRepository extends JpaRepository<BranchEntity,Integer> {
}
