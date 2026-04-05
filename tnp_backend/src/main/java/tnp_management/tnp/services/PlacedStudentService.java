package tnp_management.tnp.services;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import tnp_management.tnp.Entities.PlacedStudent;
import tnp_management.tnp.Entities.StudentProfile;
import tnp_management.tnp.dto.PlacedStudentRequestDTO;
import tnp_management.tnp.repositories.PlcacedStudentRepository;
import tnp_management.tnp.repositories.StudentProfileRepository;

@Service
public class PlacedStudentService {

    private final PlcacedStudentRepository plcacedStudentRepository ;
    private final StudentProfileRepository studentProfileRepository;
    private final ModelMapper modelMapper;

    public PlacedStudentService(PlcacedStudentRepository placedStudentRepository, StudentProfileRepository studentProfileRepository, ModelMapper modelMapper) {
        this.plcacedStudentRepository = placedStudentRepository;
        this.studentProfileRepository = studentProfileRepository;
        this.modelMapper = modelMapper;
    }

    public void addStudent(PlacedStudentRequestDTO dto, Long id) {

        StudentProfile profile = studentProfileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Profile Not Found"));

        PlacedStudent placedStudent = modelMapper.map(dto , PlacedStudent.class);

        placedStudent.setStudentProfile(profile);

        plcacedStudentRepository.save(placedStudent);

        profile.setPlaced(true);

        studentProfileRepository.save(profile);


    }
}
