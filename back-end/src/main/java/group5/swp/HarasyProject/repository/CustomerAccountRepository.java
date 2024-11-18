package group5.swp.HarasyProject.repository;

import group5.swp.HarasyProject.entity.account.AccountEntity;
import group5.swp.HarasyProject.entity.account.CustomerAccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface CustomerAccountRepository extends JpaRepository<CustomerAccountEntity, Integer> {
    Optional<CustomerAccountEntity> findByAccount(AccountEntity account);

}
