package tnp_management.tnp.Entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="student_profile")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudentProfile {

    @Id
    private Long id ;

    @OneToOne
    @MapsId
    @JoinColumn(name="user_id")
    private User user;
    private String fullName;
    private Double cgpa;
    private String branch;
    private String studentEnrollmentNo ;
    private Integer passoutYear;
    private String skills;
    private String resumeUrl;
    private String phoneNumber;


}
