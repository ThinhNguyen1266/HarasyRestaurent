package group5.swp.HarasyProject.repository;


import group5.swp.HarasyProject.entity.account.AccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import  org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<AccountEntity, Integer> {
    Optional<AccountEntity> findByEmail(String email);

    @Query("""
        select a from AccountEntity a
        where a.username = ?1
    """)
    Optional<AccountEntity> findByUsername(String username);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);

    @Query("""
            select a from AccountEntity a
            where (:phone is null or a.phone = :phone)
            """
    )
    List<AccountEntity> findAllAcc(String phone);
}
