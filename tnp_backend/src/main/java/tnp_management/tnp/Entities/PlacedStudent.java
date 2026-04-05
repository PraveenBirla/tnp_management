package tnp_management.tnp.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name="placed_students")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PlacedStudent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "student_id")
    private StudentProfile studentProfile;

    private String companyName;
    private String role;
    private Double packageAmount;
    private LocalDate placementDate;

}
