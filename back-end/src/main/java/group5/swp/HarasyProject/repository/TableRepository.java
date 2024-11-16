package group5.swp.HarasyProject.repository;

import group5.swp.HarasyProject.entity.branch.TableEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TableRepository extends JpaRepository<TableEntity,Integer> {

    @Query("select t " +
            "from TableEntity t " +
            "where t.branch.id = ?1 ")
    List<TableEntity> getTableByBBranch( int branchId);

}
