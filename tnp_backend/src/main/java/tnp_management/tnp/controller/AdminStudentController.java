package tnp_management.tnp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import tnp_management.tnp.dto.StudentListDTO;
import tnp_management.tnp.services.AdminStudentService;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminStudentController {

    private final AdminStudentService adminStudentService;


    public AdminStudentController(AdminStudentService adminStudentService) {
        this.adminStudentService = adminStudentService;
    }

    @GetMapping("/all_students")
    public ResponseEntity<List<StudentListDTO>> getAllAtudents(@RequestParam(required = false) Integer year , @RequestParam(required = false)
                                                               String branch){

         List<StudentListDTO> students = adminStudentService.getFilteredStudents(branch, year);

         return ResponseEntity.ok(students);
    }


}
