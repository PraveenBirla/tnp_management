package tnp_management.tnp.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tnp_management.tnp.dto.DriveRegistrationResponseDTO;
import tnp_management.tnp.services.DriveRegistrationService;

import java.util.List;

@RestController
@RequestMapping("/api/admin/drive")
@PreAuthorize("hasRole('ADMIN')")
public class AdminDriveRegistrationController {

    private final DriveRegistrationService driveRegistrationService;

    public AdminDriveRegistrationController(DriveRegistrationService driveRegistrationService) {
        this.driveRegistrationService = driveRegistrationService;
    }

    @GetMapping("/students_list/{driveId}")
    public ResponseEntity<List<DriveRegistrationResponseDTO>> getAll( @Valid  @PathVariable Long driveId){

        List<DriveRegistrationResponseDTO> dto = driveRegistrationService.getAll(driveId);

        return ResponseEntity.ok(dto);
    }

}
