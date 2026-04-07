package tnp_management.tnp.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import tnp_management.tnp.Entities.StudentProfile;
import tnp_management.tnp.Entities.User;
import tnp_management.tnp.dto.ContactMessageDTO;
import tnp_management.tnp.dto.DriveEmailRequestDTO;
import tnp_management.tnp.dto.PlacementDriveMessageDTO;
import tnp_management.tnp.repositories.StudentProfileRepository;
import tnp_management.tnp.repositories.UserRepository;

import java.util.List;

@Service
public class KafkaConsumerService {


    private final EmailService service;
    private final StudentProfileRepository studentProfileRepository;
    private final KafkaProducerService kafkaProducerService;

    public KafkaConsumerService(EmailService service, StudentProfileRepository studentProfileRepository,  KafkaProducerService kafkaProducerService) {

        this.service = service;
        this.studentProfileRepository = studentProfileRepository;
        this.kafkaProducerService = kafkaProducerService;

    }


    @KafkaListener(topics = "contact-topic" , groupId = "debug-group-123")
    public void consumeContactMessage(ContactMessageDTO dto){
         try{

             String emailBody =
                     "🔔 New Contact Request Received\n\n" +

                             "👤 User Details:\n" +
                             "----------------------------------\n" +
                             "Full Name : " + dto.getFullname() + "\n" +
                             "Email     : " + dto.getEmail() + "\n" +
                             "Subject   : " + dto.getSubject() + "\n\n" +

                             "💬 Message:\n" +
                             "----------------------------------\n" +
                             dto.getMessage() + "\n\n" +

                             "----------------------------------\n" +
                             "📌 This message was sent from the Contact Form.\n" +
                             "Please respond to the user as soon as possible.\n\n" +

                             "🚀 TNP Management System";

              service.sendContactEmail( "birlap409@gmail.com" , dto.getSubject() , emailBody);
         }
         catch (Exception e){
             e.printStackTrace();
         }



    }

    @KafkaListener(topics = "drive-topic", groupId = "drive-group")
    public void consumeDriveMessage(PlacementDriveMessageDTO dto) {

        System.out.println("Drive received for: " + dto.getCompanyName());


        List<StudentProfile> students =  studentProfileRepository
                .findEligibleStudents(
                        dto.getEligibleBranches(),
                        dto.getTargetYear(),
                        dto.getMinCgpa()
                );

        for (StudentProfile student : students) {

            DriveEmailRequestDTO requestDTO = new DriveEmailRequestDTO();

            requestDTO.setTo(student.getUser().getEmail());


            requestDTO.setMessage(
                    "Dear " + student.getFullName() + ",\n\n" +

                            "Greetings from the Training & Placement Cell.\n\n" +

                            "We are pleased to inform you about a new placement opportunity. Please find the details below:\n\n" +

                            "🏢 Company Name: " + dto.getCompanyName() + "\n" +
                            "💼 Job Role: " + dto.getJobRole() + "\n" +
                            "💰 Package: " + dto.getPackageLPA() + " LPA\n" +
                            "🎓 Eligible Branches: " + String.join(", ", dto.getEligibleBranches()) + "\n" +
                            "📅 Drive Date: " + dto.getDriveDate() + "\n" +
                            "⏳ Application Deadline: " + dto.getDeadline() + "\n\n" +

                            "📌 Eligibility Criteria:\n" +
                            "- Minimum CGPA: " + dto.getMinCgpa() + "\n" +
                            "- Passout Year(s): " + dto.getTargetYear() + "\n\n" +

                            (dto.getDescription() != null ?
                                    "📝 Additional Details:\n" + dto.getDescription() + "\n\n" : "") +

                            "👉 Interested students are requested to apply before the deadline.\n\n" +

                            "For any queries, feel free to contact the T&P Cell.\n\n" +

                            "Best regards,\n" +
                            "Training & Placement Cell\n" +
                            "Samrat Ashok Technological Institute"
            );

            kafkaProducerService.sendEmail(requestDTO);
        }
    }

    @KafkaListener(
            topics = "drive-email-topic",
            groupId = "drive-email-group",
            concurrency = "5"
    )
    public void consumeEmail(DriveEmailRequestDTO  dto) {

        System.out.println("Sending email to: " + dto.getTo());

        service.sendDriveEmail(dto.getTo(), dto.getMessage());
    }




}
