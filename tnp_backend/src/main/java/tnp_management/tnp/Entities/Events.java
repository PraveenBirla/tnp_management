package tnp_management.tnp.Entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;


@Entity
@Table(name = "events")
@Getter
@Setter
public class Events {

     @Id
     @GeneratedValue
     private Long id;

     @Column(nullable = false)
     private String title ;

    @Column(name = "event_location", nullable = false)
     private String location ;

     @Column(name = "event_date_time", nullable = false)
     private LocalDateTime dateTime;

     @ElementCollection
     @CollectionTable(name = "event_batches", joinColumns = @JoinColumn(name = "event_id"))
     @Column(name = "batch_year")
     private List<Integer> eligibleBatches;

     @CollectionTable(name = "event_branches", joinColumns = @JoinColumn(name = "event_id"))
     @Column(name = "branch_name")
     @ElementCollection
     private List<String>  eligibleBranch;






}
