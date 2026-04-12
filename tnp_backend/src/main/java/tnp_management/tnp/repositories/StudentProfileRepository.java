package tnp_management.tnp.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tnp_management.tnp.Entities.StudentProfile;

import tnp_management.tnp.projection.PlacementStatsProjection;


import java.util.List;
import java.util.Optional;

@Repository
public interface StudentProfileRepository  extends JpaRepository<StudentProfile , Long> {

    Optional<StudentProfile> findById(Long id);



    @Query("""
    SELECT s FROM StudentProfile s
    WHERE (:branch IS NULL OR s.branch = :branch)
    AND (:year IS NULL OR s.passoutYear = :year)
""")
    Page<StudentProfile> findStudentsByFilters(
            @Param("branch") String branch,
            @Param("year") Integer year,
            Pageable pageable
    );

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

    @Query("SELECT sp FROM StudentProfile sp " +
            "JOIN FETCH sp.user u " +
            "WHERE (:branches IS NULL OR sp.branch IN :branches) " +
            "AND (:years IS NULL OR sp.passoutYear IN :years) " +
            "AND (:cgpa IS NULL OR sp.cgpa >= :cgpa)")
    List<StudentProfile> findEligibleStudents(
            @Param("branches") List<String> branches,
            @Param("years") List<Integer> years,
            @Param("cgpa") Double cgpa
    );


}
