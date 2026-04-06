package tnp_management.tnp.services;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tnp_management.tnp.Entities.OtpDetails;
import tnp_management.tnp.Entities.User;
import tnp_management.tnp.dto.ForgetPasswordRequest;
import tnp_management.tnp.dto.ResetPasswordRequest;
import tnp_management.tnp.repositories.OtpRepository;
import tnp_management.tnp.repositories.UserRepository;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class PasswordResetService {

    private final OtpRepository otpRepository;
    private final UserRepository userRepository;
    private final JavaMailSender mailSender;
    private final PasswordEncoder passwordEncoder;
    public PasswordResetService(OtpRepository otpRepository, UserRepository userRepository, JavaMailSender mailSender, PasswordEncoder passwordEncoder) {
        this.otpRepository = otpRepository;
        this.userRepository = userRepository;
        this.mailSender = mailSender;
        this.passwordEncoder = passwordEncoder;
    }

    public void sendOtp(ForgetPasswordRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow( () ->new BadCredentialsException("User Not Found"));

        String otp = String.format("%06d", new Random().nextInt(1000000));

        OtpDetails otpDetails = otpRepository.findByUser(user)
                .orElse(new OtpDetails());

        otpDetails.setUser(user);
        otpDetails.setOtp(otp);
        otpDetails.setExpiryTime(LocalDateTime.now().plusMinutes(5));

        otpRepository.save(otpDetails);
        sendEmail(request.getEmail() , otp);
    }


    private void sendEmail(String email, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Password Reset OTP");
        message.setText("Your OTP is: " + otp);
        mailSender.send(message);
    }

    public void  resetPassword(ResetPasswordRequest request){
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        OtpDetails otpDetails = otpRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("No OTP requested for this user"));

        if(!otpDetails.getOtp().equals(request.getOtp())){
            throw new RuntimeException("Invalid OTP");
        }

        if (otpDetails.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP expired");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        otpRepository.delete(otpDetails);
    }
}
