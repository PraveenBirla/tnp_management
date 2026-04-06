package tnp_management.tnp.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationRequestDTO {
     private  String email ;
     private String password;
     private String role;

}
