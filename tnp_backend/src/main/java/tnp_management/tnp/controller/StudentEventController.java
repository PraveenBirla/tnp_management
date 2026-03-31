package tnp_management.tnp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tnp_management.tnp.dto.EventResponseDTO;
import tnp_management.tnp.services.EventService;

import java.util.List;

@RestController
@RequestMapping("/api/student/events")
@PreAuthorize("hasRole('STUDENT')")
public class StudentEventController {

    private final EventService eventService;

    public StudentEventController(EventService eventService) {
        this.eventService = eventService;
    }
    @GetMapping("/my-list")
    public ResponseEntity<List<EventResponseDTO>> getAllEvents(){
          List<EventResponseDTO> dtos = eventService.getAllEvents();
          return ResponseEntity.ok(dtos);
    }
}
