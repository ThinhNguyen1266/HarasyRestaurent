package group5.swp.HarasyProject.repository;

import group5.swp.HarasyProject.entity.branch.TableEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TableRepository extends JpaRepository<TableEntity,Integer> {
}
