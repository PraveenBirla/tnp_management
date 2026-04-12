package tnp_management.tnp.services;



import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import tnp_management.tnp.Entities.PlacementDrive;
import tnp_management.tnp.Entities.StudentProfile;
import tnp_management.tnp.Entities.User;
import tnp_management.tnp.dto.PlacementDriveDTO;
import tnp_management.tnp.dto.PlacementDriveMessageDTO;
import tnp_management.tnp.dto.PlacementDriveResponseDTO;
import tnp_management.tnp.repositories.PlacementDriveRepository;
import tnp_management.tnp.repositories.StudentProfileRepository;
import tnp_management.tnp.repositories.UserRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlacementDriveService {

    private final ModelMapper modelMapper;
    private final PlacementDriveRepository placementDriveRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final UserRepository userRepository;
    private final KafkaProducerService kafkaProducerService;

    public PlacementDriveService(ModelMapper modelMapper, PlacementDriveRepository placementDriveRepository, StudentProfileRepository studentProfileRepository, UserRepository userRepository, KafkaProducerService kafkaProducerService) {
        this.modelMapper = modelMapper;
        this.placementDriveRepository = placementDriveRepository;
        this.studentProfileRepository = studentProfileRepository;
        this.userRepository = userRepository;
        this.kafkaProducerService = kafkaProducerService;
    }

    public PlacementDriveDTO createDrive(PlacementDriveDTO placementDriveDTO) {
        PlacementDrive placementDrive = modelMapper.map(placementDriveDTO , PlacementDrive.class);

        PlacementDrive savedDrive = placementDriveRepository.save(placementDrive);

        PlacementDriveMessageDTO  dto = modelMapper.map(placementDriveDTO , PlacementDriveMessageDTO.class);

        kafkaProducerService.sendDriveMessage(dto);

        return modelMapper.map(savedDrive , PlacementDriveDTO.class);



    }

    public List<PlacementDriveResponseDTO> getAllDrive() {  
        
        List<PlacementDrive> drives = placementDriveRepository.findAll();
        
        return drives.stream()
                .map(drive -> modelMapper.map(drive , PlacementDriveResponseDTO.class))
                .collect(Collectors.toList());
        
    }

    public List<PlacementDriveResponseDTO> getAllEligibleDrive() {

        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        StudentProfile profile = studentProfileRepository.findById(user.getId())
                .orElseThrow(() -> new RuntimeException("profile not found"));

         return placementDriveRepository.findEligibleDrives(profile.getBranch() , profile.getPassoutYear()
        ).stream()
                .map(placementDrive -> { PlacementDriveResponseDTO dto =  modelMapper.map(placementDrive , PlacementDriveResponseDTO.class);
                   dto.setExpired(
                           placementDrive.getDeadline() != null && placementDrive.getDeadline().isBefore(LocalDateTime.now())
                   );
                    boolean isRegistered = placementDrive.getRegistrations()
                            .stream()
                            .anyMatch(reg -> reg.getStudent().getId().equals(user.getId()));
                    dto.setRegistered(isRegistered);
                    return dto;


                })
                .collect(Collectors.toList());
    }

    public void deleteDrive(Long id) {
        if (!placementDriveRepository.existsById(id)) {
            throw new RuntimeException("Drive not found");
        }
        placementDriveRepository.deleteById(id);
    }


    public void updateDrive(Long id, PlacementDriveDTO placementDriveDTO) {

        PlacementDrive drive = placementDriveRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("drive not found"));
        modelMapper.map(placementDriveDTO  , drive);
        placementDriveRepository.save(drive);
    }
}
