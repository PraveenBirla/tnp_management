package tnp_management.tnp.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentListDTO {


        private Long  id;
        private String fullName;
        private String email;
        private String branch;
        private Integer passoutYear;
        private Double cgpa;
        private String phoneNumber;


}
