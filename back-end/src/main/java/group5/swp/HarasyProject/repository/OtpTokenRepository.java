package group5.swp.HarasyProject.repository;

import group5.swp.HarasyProject.entity.OtpTokenEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OtpTokenRepository extends JpaRepository<OtpTokenEntity,Integer> {
    Optional<OtpTokenEntity> findByToken(String token);
    void deleteByToken(String token);
}
