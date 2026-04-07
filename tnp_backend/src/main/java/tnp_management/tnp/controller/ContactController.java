package tnp_management.tnp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tnp_management.tnp.dto.ContactMessageDTO;
import tnp_management.tnp.services.KafkaProducerService;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class ContactController {

    private final KafkaProducerService kafkaProducerService;

    public ContactController(KafkaProducerService kafkaProducerService) {
        this.kafkaProducerService = kafkaProducerService;

    }

    @PostMapping("/contact")
    public ResponseEntity<Map<String,String>> contact(@RequestBody ContactMessageDTO dto){
          kafkaProducerService.sendContactMessage(dto);
          return   ResponseEntity.ok().build();
    }
}
