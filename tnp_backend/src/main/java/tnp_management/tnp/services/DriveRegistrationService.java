package tnp_management.tnp.services;


import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import tnp_management.tnp.Entities.DriveRegistration;
import tnp_management.tnp.Entities.PlacementDrive;
import tnp_management.tnp.Entities.StudentProfile;
import tnp_management.tnp.Entities.User;
import tnp_management.tnp.dto.DriveRegistrationResponseDTO;
import tnp_management.tnp.repositories.DriveRegistrationRepository;
import tnp_management.tnp.repositories.PlacementDriveRepository;
import tnp_management.tnp.repositories.StudentProfileRepository;
import tnp_management.tnp.repositories.UserRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DriveRegistrationService {

    private final UserRepository userRepository ;
    private final StudentProfileRepository studentProfileRepository;
    private final DriveRegistrationRepository driveRegistrationRepository ;
    private final PlacementDriveRepository placementDriveRepository ;

    public DriveRegistrationService(UserRepository userRepository, StudentProfileRepository studentProfileRepository, DriveRegistrationRepository driveRegistrationRepository, PlacementDriveRepository placementDriveRepository) {
        this.userRepository = userRepository;
        this.studentProfileRepository = studentProfileRepository;
        this.driveRegistrationRepository = driveRegistrationRepository;
        this.placementDriveRepository = placementDriveRepository;
    }

    public  Void register(Long driveId) {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("user not found"));
        StudentProfile profile = studentProfileRepository.findById(user.getId())
                .orElseThrow(() -> new RuntimeException("Profile Not Found"));

        PlacementDrive drive = placementDriveRepository.findById(driveId)
                .orElseThrow(() -> new RuntimeException("Drive Not Found"));
        if(driveRegistrationRepository.existsByStudentAndPlacementDrive(profile , drive )){
            throw new RuntimeException("Already applied for this drive");
        }

        DriveRegistration driveRegistration =new DriveRegistration();
        driveRegistration.setStudent(profile);
        driveRegistration.setPlacementDrive(drive);
        driveRegistration.setRegisteredAt(LocalDateTime.now());
        driveRegistration.setStatus("APPLIED");

        driveRegistrationRepository.save(driveRegistration);


        return null;
    }

    public List<DriveRegistrationResponseDTO> getAll(Long driveId) {

        List<DriveRegistration> registration = driveRegistrationRepository.findByPlacementDriveId(driveId);

         return registration.stream()
                 .map(this::mapToDTO)
                 .collect(Collectors.toList());


    }

    private DriveRegistrationResponseDTO mapToDTO(DriveRegistration registration) {
        DriveRegistrationResponseDTO dto = new DriveRegistrationResponseDTO();

        dto.setId(registration.getId());

        dto.setStudentId(registration.getStudent().getId());
        dto.setStudentName(registration.getStudent().getFullName());
        dto.setStudentEnrollmentNo(registration.getStudent().getStudentEnrollmentNo());
        dto.setDriveId(registration.getPlacementDrive().getId());
        dto.setStatus(registration.getStatus());
        dto.setRegisteredAt(registration.getRegisteredAt());
        dto.setRemarks(registration.getRemarks());

        return dto;
    }
}
