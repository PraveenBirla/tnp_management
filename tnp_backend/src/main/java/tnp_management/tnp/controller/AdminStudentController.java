package tnp_management.tnp.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import tnp_management.tnp.dto.StudentListDTO;
import tnp_management.tnp.dto.StudentProfileResponseDTO;
import tnp_management.tnp.services.AdminStudentService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminStudentController {

    private final AdminStudentService adminStudentService;


    public AdminStudentController(AdminStudentService adminStudentService) {
        this.adminStudentService = adminStudentService;
    }

    @GetMapping("/all_students")
    public ResponseEntity<Page<StudentProfileResponseDTO>> getAllAtudents(@RequestParam(required = false) Integer year,
                                                                          @RequestParam(required = false) String branch,
                                                                          @RequestParam(required = true)  Integer page,
                                                                          @RequestParam(required = true)  Integer size){

          Page<StudentProfileResponseDTO> students = adminStudentService.getFilteredStudents(branch, year,page,size);

         return ResponseEntity.ok(students);
    }

    @PostMapping("/mark-verified/{userId}")
    public ResponseEntity<Map<String , String>> verifyStudent(@PathVariable Long userId){
         adminStudentService.verifyStudent(userId);
      return  ResponseEntity.ok(Map.of("message" , "Verified"));
    }

}
