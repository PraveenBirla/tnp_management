package tnp_management.tnp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tnp_management.tnp.dto.PlacedStudentRequestDTO;
import tnp_management.tnp.services.PlacedStudentService;

@RestController
@RequestMapping("/api/admin/")
public class AdminPlacedStudentController {

    private final PlacedStudentService placedStudentService;

    public AdminPlacedStudentController(PlacedStudentService placedStudentService) {
        this.placedStudentService = placedStudentService;
    }

    @PostMapping("place-student/{id}")
    ResponseEntity<Void> addStudent(@RequestBody PlacedStudentRequestDTO dto , @PathVariable Long id){
          placedStudentService.addStudent(dto , id);

         return ResponseEntity.ok().build();

     }
}
