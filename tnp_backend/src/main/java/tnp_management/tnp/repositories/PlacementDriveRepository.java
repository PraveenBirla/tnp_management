package tnp_management.tnp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tnp_management.tnp.Entities.PlacementDrive;

import java.util.List;

@Repository
public interface PlacementDriveRepository extends JpaRepository<PlacementDrive , Long> {

    @Query("""
        SELECT p 
        FROM PlacementDrive p 
        WHERE :branch MEMBER OF p.eligibleBranches
        AND :year MEMBER OF p.targetYear
    """)
    List<PlacementDrive> findEligibleDrives(@Param("branch") String branch,
                                            @Param("year") Integer year);
}
