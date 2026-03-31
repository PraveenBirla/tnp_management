package tnp_management.tnp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import tnp_management.tnp.dto.StudentListDTO;
import tnp_management.tnp.services.AdminService;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('STUDENT')")
public class AdminController {

    private final AdminService adminService ;


    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/all_students")
    public ResponseEntity<List<StudentListDTO>> getAllAtudents(@RequestParam(required = false) Integer year , @RequestParam(required = false)
                                                               String branch){

         List<StudentListDTO> students = adminService.getFilteredStudents(branch, year);

         return ResponseEntity.ok(students);
    }


}
