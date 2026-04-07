package tnp_management.tnp.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import tnp_management.tnp.dto.ContactMessageDTO;

@Service
public class KafkaProducerService {

    private final KafkaTemplate<String,  String> kafkaTemplate;
    private final ObjectMapper objectMapper;
    private static final String TOPIC = "contact-topic";

    public KafkaProducerService(KafkaTemplate<String,  String> kafkaTemplate, ObjectMapper objectMapper) {
        this.kafkaTemplate = kafkaTemplate;
        this.objectMapper = objectMapper;
    }

    public void sendContactMessage(ContactMessageDTO dto){
        try {
            String json = objectMapper.writeValueAsString(dto);
            kafkaTemplate.send(TOPIC, json);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


}
