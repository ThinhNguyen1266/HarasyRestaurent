package group5.swp.HarasyProject.repository;

import group5.swp.HarasyProject.entity.branch.BranchEntity;
import group5.swp.HarasyProject.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Set;


public interface BranchRepository extends JpaRepository<BranchEntity,Integer> {
    Optional<BranchEntity> findById( Integer id);
    Set<BranchEntity> findAllByStatus(Status status);

    boolean existsByNameAndIdNot(String name, Integer id);
    boolean existsByName(String name);
}
