package tnp_management.tnp.dto;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContactMessageDTO {

    @NotBlank(message = "email is not blank")
    @Email(message = "Email should be a valid email")
    private String email;

    @NotBlank(message = "name is not blank")
    private String fullname;

    @NotBlank(message = "subject is not blank")
    private String subject;

    @NotBlank(message = "message is not blank")
    private String message;




}
