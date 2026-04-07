package tnp_management.tnp.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tnp_management.tnp.dto.ForgetPasswordRequest;
import tnp_management.tnp.dto.ResetPasswordRequest;
import tnp_management.tnp.services.PasswordResetService;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class ResetPasswordController {

    private final PasswordResetService passwordResetService;



    public ResetPasswordController(PasswordResetService passwordResetService) {
        this.passwordResetService = passwordResetService;
    }


    @PostMapping("/forget-password")
    public ResponseEntity<Map<String,String>> forgetPassword(@RequestBody ForgetPasswordRequest request){
        passwordResetService.sendOtp(request);
        return ResponseEntity.ok(Map.of("message" , "OTP Sent On The Registered Email"));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Map<String , String>> resetPassword(@Valid @RequestBody ResetPasswordRequest request){
        passwordResetService.resetPassword(request);
        return ResponseEntity.ok(Map.of("message" , "password change succesfully"));
    }
}
