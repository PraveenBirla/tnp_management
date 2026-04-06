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

    @Column(name="student_name" , nullable = false)
    private String fullName;

    @Column(name="student_cgpa" , nullable = false)
    private Double cgpa;

    @Column(name="student_branch" , nullable = false)
    private String branch;

    @Column(name="student_enrollment_no" , nullable = false)
    private String studentEnrollmentNo ;

    @Column(name="student_passoutyear" , nullable = false)
    private Integer passoutYear;

    private String skills;

    private String resumeUrl;

    @Column(name="student_contact_number" , nullable = false)
    private String phoneNumber;

    private boolean isPlaced = false ;

    @OneToOne(mappedBy = "studentProfile" , cascade = CascadeType.ALL)
    private PlacedStudent placedStudent;

}
