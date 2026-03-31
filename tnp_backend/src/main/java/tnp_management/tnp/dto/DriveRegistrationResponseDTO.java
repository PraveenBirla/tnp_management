package tnp_management.tnp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DriveRegistrationResponseDTO {

    private Long id;
    private Long studentId;
    private String studentName;
    private String studentEnrollmentNo;
    private Long driveId;
    private String driveTitle;
    private String status;
    private LocalDateTime registeredAt;
    private String remarks;


}
