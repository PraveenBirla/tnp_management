package tnp_management.tnp.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tnp_management.tnp.Entities.DriveRegistration;
import tnp_management.tnp.services.DriveRegistrationService;

@RestController
@RequestMapping("/api/student/drive")
@PreAuthorize("hasRole('STUDENT')")
public class StudentDriveRegistrationController {

    private final DriveRegistrationService driveRegistrationService;


    public StudentDriveRegistrationController(DriveRegistrationService driveRegistrationService) {
        this.driveRegistrationService = driveRegistrationService;
    }

    @PostMapping("/apply/{driveId}")
    public ResponseEntity<Void> register(@PathVariable Long driveId){

        return ResponseEntity.ok(driveRegistrationService.register(driveId));
    }

}
