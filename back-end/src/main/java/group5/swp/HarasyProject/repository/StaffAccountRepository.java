package group5.swp.HarasyProject.repository;

import group5.swp.HarasyProject.entity.account.AccountEntity;
import group5.swp.HarasyProject.entity.account.StaffAccountEntity;
import group5.swp.HarasyProject.entity.branch.BranchEntity;
import group5.swp.HarasyProject.enums.Account.AccountStatus;
import group5.swp.HarasyProject.enums.Account.StaffRole;
import group5.swp.HarasyProject.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StaffAccountRepository extends JpaRepository<StaffAccountEntity, Integer> {
    Optional<StaffAccountEntity> findByAccount(AccountEntity account);

    List<StaffAccountEntity> findAllByAccount_Status(AccountStatus status);

    // Corrected sorting method by role in ascending order
    List<StaffAccountEntity> findAllByOrderByRoleAsc();

    List<StaffAccountEntity> findAllByRole(StaffRole role);

    List<StaffAccountEntity> findAllByBranchId(int branchId);
}
