package tnp_management.tnp.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class EventRequestDTO {

    private String title;
    private String location;
    private LocalDateTime dateTime;
    private List<Integer> eligibleBatches;
    private List<String> eligibleBranch;
}
