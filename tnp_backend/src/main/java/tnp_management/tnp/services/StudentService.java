package tnp_management.tnp.services;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import tnp_management.tnp.Entities.StudentProfile;
import tnp_management.tnp.Entities.User;
import tnp_management.tnp.dto.StudentProfileDTO;
import tnp_management.tnp.repositories.StudentProfileRepository;
import tnp_management.tnp.repositories.UserRepository;

@Service
public class StudentService {

    private final UserRepository userRepository;


    private final ModelMapper modelMapper;

    private final StudentProfileRepository studentProfileRepository;

    public StudentService(UserRepository userRepository, ModelMapper modelMapper, StudentProfileRepository studentProfileRepository) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.studentProfileRepository = studentProfileRepository;
    }

    public StudentProfileDTO updateProfile(Long userId, StudentProfileDTO studentProfileDTO) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        StudentProfile studentProfile = studentProfileRepository.findById(user.getId()).
                orElse(new StudentProfile());

        modelMapper.map(studentProfileDTO , studentProfile);


        studentProfile.setUser(user);

         StudentProfile savedProfile = studentProfileRepository.save(studentProfile);

        return modelMapper.map( savedProfile, StudentProfileDTO.class);

    }

    public StudentProfileDTO CreateProfile(Long userId, StudentProfileDTO studentProfileDTO) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        StudentProfile studentProfile = studentProfileRepository.findById(userId).
                orElse(new StudentProfile());

        modelMapper.map(studentProfileDTO , studentProfile);


        studentProfile.setUser(user);

        StudentProfile savedProfile = studentProfileRepository.save(studentProfile);

        return modelMapper.map( savedProfile, StudentProfileDTO.class);

    }


    public StudentProfileDTO getProfile(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        StudentProfile studentProfile = studentProfileRepository.findById(user.getId())
                .orElseThrow(() -> new RuntimeException("Student profile not found"));


        return modelMapper.map(studentProfile, StudentProfileDTO.class);

    }
}
