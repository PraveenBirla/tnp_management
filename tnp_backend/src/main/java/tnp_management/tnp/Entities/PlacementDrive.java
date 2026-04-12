package tnp_management.tnp.Entities;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;



import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "placement_drive")
@Getter
@Setter
public class PlacementDrive {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String companyName;
    private String jobRole;
    private Double packageLPA;

    @ElementCollection
    @CollectionTable(name = "drive_eligible_branches", joinColumns = @JoinColumn(name = "drive_id"))
    @Column(name = "branch_name")
    private List<String> eligibleBranches;

    @ElementCollection
    @CollectionTable(name = "drive_eligible_targetyear" , joinColumns = @JoinColumn(name="drive_id"))
    @Column(name="passout_year")
    private  List<Integer> targetYear;

    private Double minCgpa;
    private Integer maxBacklogs;

    private LocalDateTime deadline;
    private LocalDateTime driveDate;
    private String description;

    @OneToMany(mappedBy = "placementDrive", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.LAZY)
    private List<DriveRegistration> registrations;

}
