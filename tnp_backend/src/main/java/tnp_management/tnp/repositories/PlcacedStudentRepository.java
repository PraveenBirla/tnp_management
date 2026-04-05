package tnp_management.tnp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tnp_management.tnp.Entities.PlacedStudent;


@Repository
public interface PlcacedStudentRepository extends JpaRepository<PlacedStudent , Long> {
}
