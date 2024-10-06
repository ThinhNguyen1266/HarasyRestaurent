package group5.swp.HarasyProject.repository;

import group5.swp.HarasyProject.entity.account.AccountEntity;
import group5.swp.HarasyProject.entity.account.CustomerAccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerAccountRepository extends JpaRepository<CustomerAccountEntity, Integer> {
    Optional<CustomerAccountEntity> findByAccount(AccountEntity account);
}
