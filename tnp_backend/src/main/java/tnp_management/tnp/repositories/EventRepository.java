package tnp_management.tnp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tnp_management.tnp.Entities.Events;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Events , Long> {

    @Query("SELECT e FROM Events e WHERE :branch MEMBER OF e.eligibleBranch AND :batch MEMBER OF e.eligibleBatches")
    List<Events> findByBranchAndBatch(String branch, Integer batch);

    List<Events> findAllByDateTimeAfterOrderByDateTimeAsc(LocalDateTime now);

}
