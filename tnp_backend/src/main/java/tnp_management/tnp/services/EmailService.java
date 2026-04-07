package tnp_management.tnp.services;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }



    public  void sendContactEmail(String email, String subject, String emailBody) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject(subject);
        message.setText(emailBody);
        mailSender.send(message);
        System.out.println("contact email sent");
    }


    public void sendOtpEmail(String email, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("TNP Password Reset OTP");
        message.setText(
                "Dear User,\n\n" +
                        "Your One-Time Password (OTP) for verification is: " + otp + "\n\n" +
                        "This OTP is valid for 5 minutes. Please do not share it with anyone.\n\n" +
                        "If you did not request this, please ignore this email.\n\n" +
                        "Regards,\n" +
                        "Training & Placement Team"
        );
        mailSender.send(message);
        System.out.println("Otp Email Sent");
    }

    public void sendDriveEmail(String email , String  emailBody){
             SimpleMailMessage message = new SimpleMailMessage();

             message.setTo(email);
             message.setSubject("New Placement Drive");
             message.setText(emailBody);
             mailSender.send(message);
            System.out.println("Email sent to the Eligible Student");
    }

}
