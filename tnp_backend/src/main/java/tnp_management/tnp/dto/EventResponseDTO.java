package tnp_management.tnp.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class EventResponseDTO {

    private Long id;
    private String title;
    private String location;
    private LocalDateTime dateTime;
    private List<Integer> eligibleBatches;
    private List<String> eligibleBranch;
    private boolean isExpired;

}
