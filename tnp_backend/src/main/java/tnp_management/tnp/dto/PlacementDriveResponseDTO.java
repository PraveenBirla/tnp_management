package tnp_management.tnp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PlacementDriveResponseDTO {
    private Long id ;
    private String companyName;
    private String jobRole;
    private Double packageLPA;
    private List<String> eligibleBranches;

    private List<Integer> targetYear;

    private Double minCgpa;
    private Integer maxBacklogs;

    private LocalDateTime deadline;
    private LocalDateTime driveDate;
    private String description;
    private boolean  isExpired;
   private boolean isRegistered;
}
