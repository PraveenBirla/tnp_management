package tnp_management.tnp.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import tnp_management.tnp.dto.EventRequestDTO;
import tnp_management.tnp.dto.EventResponseDTO;
import tnp_management.tnp.services.EventService;

import java.util.List;

@RestController
@RequestMapping("/api/admin/events")
@PreAuthorize("hasRole('ADMIN')")
public class AdminEventController {

    private final EventService eventService;


    public AdminEventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping("/add")
    public ResponseEntity<EventRequestDTO> addEvent( @Valid  @RequestBody EventRequestDTO dto){
        EventRequestDTO created = eventService.createEvent(dto);
        return new ResponseEntity<>(created , HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<EventResponseDTO>> fetchAll(){
        List<EventResponseDTO> dto = eventService.getAll();
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateEvent(@PathVariable Long id , @RequestBody EventRequestDTO dto){
        eventService.updateEvent(id , dto);
        return   ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletEvent(@PathVariable Long id){
        eventService.deleteEvent(id);
        return ResponseEntity.ok().build();

    }
}
