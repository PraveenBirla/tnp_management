package tnp_management.tnp.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import tnp_management.tnp.dto.ContactMessageDTO;

@Service
public class KafkaConsumerService {

    private final ObjectMapper objectMapper;
    private final EmailService service;
    public KafkaConsumerService(ObjectMapper objectMapper, EmailService service) {
        this.objectMapper = objectMapper;
        this.service = service;
    }


    @KafkaListener(topics = "contact-topic" , groupId = "debug-group-123")
    public void consumeContactMessage(String message){
         try{
             ContactMessageDTO dto =
                     objectMapper.readValue(message, ContactMessageDTO.class);

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


}
