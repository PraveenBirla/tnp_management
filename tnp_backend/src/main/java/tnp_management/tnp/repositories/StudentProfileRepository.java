package tnp_management.tnp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tnp_management.tnp.Entities.StudentProfile;
import tnp_management.tnp.dto.StudentListDTO;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentProfileRepository  extends JpaRepository<StudentProfile , Long> {

    Optional<StudentProfile> findById(Long id);

    @Query("SELECT new tnp_management.tnp.dto.StudentListDTO(u.id, sp.fullName, u.email, sp.branch, sp.passoutYear, sp.cgpa, sp.phoneNumber) " +
            "FROM StudentProfile sp JOIN sp.user u")
    List<StudentListDTO> findAllStudentsCustom();


    @Query("SELECT new tnp_management.tnp.dto.StudentListDTO(" +
            "u.id, sp.fullName, u.email, sp.branch, sp.passoutYear, sp.cgpa, sp.phoneNumber) " +
            "FROM StudentProfile sp JOIN sp.user u " +
            "WHERE (:branch IS NULL OR sp.branch = :branch) " +
            "AND (:year IS NULL OR sp.passoutYear = :year)")
    List<StudentListDTO> findStudentsByFilters(@Param("branch") String branch,
                                               @Param("year") Integer year);


}
