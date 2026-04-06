package tnp_management.tnp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tnp_management.tnp.Entities.StudentProfile;
import tnp_management.tnp.dto.StudentListDTO;
import tnp_management.tnp.projection.PlacementStatsProjection;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentProfileRepository  extends JpaRepository<StudentProfile , Long> {

    Optional<StudentProfile> findById(Long id);

    @Query("SELECT sp FROM StudentProfile sp JOIN FETCH sp.user u")
    List<StudentProfile> findAllStudentsCustom();

    @Query("SELECT sp FROM StudentProfile sp JOIN FETCH sp.user u " +
            "WHERE (:branch IS NULL OR sp.branch = :branch) " +
            "AND (:year IS NULL OR sp.passoutYear = :year)")
    List<StudentProfile> findStudentsByFilters(@Param("branch") String branch,
                                               @Param("year") Integer year);

    @Query("""
SELECT 
    sp.passoutYear AS year,
    COUNT(sp.id) AS total,
    COUNT(sp.placedStudent.id) AS placed,
    COUNT(DISTINCT ps.companyName) AS companies
FROM StudentProfile sp
LEFT JOIN sp.placedStudent ps
GROUP BY sp.passoutYear
ORDER BY sp.passoutYear
""")
    List<PlacementStatsProjection> getPlacementStats();


}
