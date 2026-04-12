package tnp_management.tnp.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class PlacedStudentRequestDTO {


    @NotBlank(message = "Enter a Valid Company Name")
    private String companyName;

    @NotBlank(message = "Enter a Valid Role")
    private String role;

    @NotBlank(message = "Enter a Valid Package Amount")
    private Double packageAmount;

    @NotBlank(message = "Enter a Valid  Placement Date")
    private LocalDate placementDate;
}
