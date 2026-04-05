package tnp_management.tnp.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentListDTO {

        private Long  id;
        private String fullName;
        private String studentEnrollmentNo;
        private String email;
        private String branch;
        private Integer passoutYear;
        private String phoneNumber;
        private boolean isPlaced;
}
