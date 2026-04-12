package tnp_management.tnp.dto;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import tnp_management.tnp.Entities.PlacedStudent;
import tnp_management.tnp.Entities.User;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentProfileResponseDTO {

    private Long id ;


    private String fullName;


    private Double cgpa;


    private String branch;


    private String studentEnrollmentNo ;


    private Integer passoutYear;


    private String skills;


    private String resumeUrl;


    private String tenthMarksheetUrl;


    private String twelfthMarksheetUrl;


    private String  lastSemesterMarkSheetUrl;


    private String phoneNumber;

    private boolean isPlaced = false ;

    private boolean isVerified = false;






}
