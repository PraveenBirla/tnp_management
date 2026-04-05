package tnp_management.tnp.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class PlacedStudentRequestDTO {


    private String companyName;
    private String role;
    private Double packageAmount;
    private LocalDate placementDate;
}
