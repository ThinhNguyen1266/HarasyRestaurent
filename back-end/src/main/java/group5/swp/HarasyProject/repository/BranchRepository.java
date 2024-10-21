package group5.swp.HarasyProject.repository;

import group5.swp.HarasyProject.entity.branch.BranchEntity;
import group5.swp.HarasyProject.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface BranchRepository extends JpaRepository<BranchEntity,Integer> {
    Optional<BranchEntity> findById( Integer id);
    List<BranchEntity> findAllByStatus(Status status);

    boolean existsByNameAndIdNot(String name, Integer id);
    boolean existsByName(String name);
}
