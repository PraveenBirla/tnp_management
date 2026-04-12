package tnp_management.tnp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudentProfileRequestDTO {

    private String fullName;
    private Double cgpa;
    private String branch;
    private Integer passoutYear;
    private String studentEnrollmentNo;
    private String skills;
    private String phoneNumber;

}
