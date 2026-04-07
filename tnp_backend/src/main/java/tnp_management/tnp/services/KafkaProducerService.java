package tnp_management.tnp.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import tnp_management.tnp.dto.ContactMessageDTO;
import tnp_management.tnp.dto.DriveEmailRequestDTO;
import tnp_management.tnp.dto.PlacementDriveMessageDTO;

@Service
public class KafkaProducerService {

    private final KafkaTemplate<String,  Object> kafkaTemplate;

    private static final String CONTACT_TOPIC = "contact-topic";
    private static final String DRIVE_TOPIC = "drive-topic";
    private static final String  DRIVE_EMAIL_TOPIC = "drive-email-topic";

    public KafkaProducerService(KafkaTemplate<String, Object> kafkaTemplate ) {
        this.kafkaTemplate = kafkaTemplate;

    }

    public void sendContactMessage(ContactMessageDTO dto){
        try {
            kafkaTemplate.send(CONTACT_TOPIC,  dto);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void sendDriveMessage(PlacementDriveMessageDTO dto){
        try{
            kafkaTemplate.send(DRIVE_TOPIC , dto);
            System.out.println("Drive Message Sent to The Kafka");
        }
        catch (Exception e){
             e.printStackTrace();
        }
    }

    public void sendEmail(DriveEmailRequestDTO dto){
        kafkaTemplate.send(DRIVE_EMAIL_TOPIC , dto);
    }

}
