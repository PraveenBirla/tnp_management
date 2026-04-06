package tnp_management.tnp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tnp_management.tnp.Entities.OtpDetails;
import tnp_management.tnp.Entities.User;

import java.util.Optional;


public interface OtpRepository extends JpaRepository<OtpDetails , Long> {

    Optional<OtpDetails> findByUser(User user);
}
