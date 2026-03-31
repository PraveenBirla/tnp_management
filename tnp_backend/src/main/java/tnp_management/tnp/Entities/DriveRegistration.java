package tnp_management.tnp.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name="registration")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DriveRegistration {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    private StudentProfile student;

    private String studentEnrollmentNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name= "drive_id")
    private PlacementDrive placementDrive;

    @Column(nullable = false)
    private LocalDateTime  registeredAt;

    @Column(nullable = false)
    private String status;

    private String remarks;


}