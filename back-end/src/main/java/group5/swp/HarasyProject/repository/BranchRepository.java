package group5.swp.HarasyProject.repository;

import group5.swp.HarasyProject.entity.branch.BranchEntity;
import group5.swp.HarasyProject.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BranchRepository extends JpaRepository<BranchEntity,Integer> {

    Optional<BranchEntity> findById( int id);
    List<BranchEntity> findAllByStatus(Status status);

    boolean existsByNameAndIdNot(String name, Integer id);
    boolean existsByName(String name);
}
