package tnp_management.tnp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlacementDriveMessageDTO {

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
}
