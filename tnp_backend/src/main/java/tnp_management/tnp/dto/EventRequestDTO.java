package tnp_management.tnp.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.FutureOrPresent;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class EventRequestDTO {

    private String title;

    private String location;

    @Future(message = "date must be in Future")
    private LocalDateTime dateTime;

    private List<Integer> eligibleBatches;

    private List<String> eligibleBranch;
}
