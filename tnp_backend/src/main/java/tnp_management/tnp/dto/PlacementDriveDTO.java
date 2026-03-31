package tnp_management.tnp.dto;


import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class PlacementDriveDTO {

    private String companyName;
    private String jobRole;
    private Double packageLPA;
    private List<String> eligibleBranches;

    private  List<Integer> targetYear;

    private Double minCgpa;
    private Integer maxBacklogs;

    private LocalDateTime deadline;
    private LocalDateTime driveDate;
    private String description;
}
