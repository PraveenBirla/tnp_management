package tnp_management.tnp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DriveEmailRequestDTO {

    private String to;
    private String message;
}
