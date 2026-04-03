package tnp_management.tnp.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import tnp_management.tnp.dto.PlacementDriveDTO;
import tnp_management.tnp.dto.PlacementDriveResponseDTO;
import tnp_management.tnp.services.PlacementDriveService;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminPlacementDriveController {

       private final PlacementDriveService placementDriveService;

    public AdminPlacementDriveController(PlacementDriveService placementDriveService) {
        this.placementDriveService = placementDriveService;

    }

     @PostMapping("/drive_post")
       public ResponseEntity<PlacementDriveDTO> CreateDrive(@RequestBody PlacementDriveDTO placementDriveDTO){

           PlacementDriveDTO placementDriveDTO1 =  placementDriveService.createDrive(placementDriveDTO);

           return new ResponseEntity<>(placementDriveDTO1 , HttpStatus.CREATED);
    }

    @GetMapping("/all_drives")
    public ResponseEntity<List<PlacementDriveResponseDTO>> getAll(){
        List<PlacementDriveResponseDTO> dtos = placementDriveService.getAllDrive();
        return ResponseEntity.ok(dtos);
    }

    @DeleteMapping("/delete_drive/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        placementDriveService.deleteDrive(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("update_drive/{id}")
    public ResponseEntity<Void> update(@PathVariable Long id , @RequestBody PlacementDriveDTO
                                       placementDriveDTO){
        placementDriveService.updateDrive(id , placementDriveDTO);
        return ResponseEntity.ok().build();

    }


}
