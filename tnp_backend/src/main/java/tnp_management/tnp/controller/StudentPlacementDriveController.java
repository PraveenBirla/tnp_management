package tnp_management.tnp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.w3c.dom.stylesheets.LinkStyle;
import tnp_management.tnp.dto.PlacementDriveDTO;
import tnp_management.tnp.dto.PlacementDriveResponseDTO;
import tnp_management.tnp.services.PlacementDriveService;

import java.util.List;

@RestController
@RequestMapping("api/drive/get_all")
public class StudentPlacementDriveController {
    private final PlacementDriveService placementDriveService ;

    public StudentPlacementDriveController(PlacementDriveService placementDriveService) {
        this.placementDriveService = placementDriveService;
    }

    @GetMapping()
    public ResponseEntity<List<PlacementDriveResponseDTO>> getAll(){
         List<PlacementDriveResponseDTO> dtos = placementDriveService.getAllEligibleDrive();

         return ResponseEntity.ok(dtos);
    }
}
