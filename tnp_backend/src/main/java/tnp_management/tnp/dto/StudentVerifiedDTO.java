package tnp_management.tnp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentVerifiedDTO {

    private String fullName;
    private String studentEnrollmentNo;
    private String branch;
    private boolean isVerified;

}
