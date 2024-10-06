package group5.swp.HarasyProject.repository;

import group5.swp.HarasyProject.entity.account.AccountEntity;
import group5.swp.HarasyProject.entity.account.StaffAccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StaffAccountRepository extends JpaRepository<StaffAccountEntity, Integer> {
    Optional<StaffAccountEntity> findByAccount(AccountEntity account);
}
