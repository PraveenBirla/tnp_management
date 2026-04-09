package tnp_management.tnp.services;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tnp_management.tnp.Entities.StudentProfile;
import tnp_management.tnp.Entities.User;
import tnp_management.tnp.dto.StudentProfileDTO;
import tnp_management.tnp.dto.StudentVerifiedDTO;
import tnp_management.tnp.repositories.StudentProfileRepository;
import tnp_management.tnp.repositories.UserRepository;

@Service
public class StudentService {

    private final UserRepository userRepository;


    private final ModelMapper modelMapper;

    private final StudentProfileRepository studentProfileRepository;

    private final FileUploadService fileUploadService;


    public StudentService(UserRepository userRepository, ModelMapper modelMapper, StudentProfileRepository studentProfileRepository, FileUploadService fileUploadService) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.studentProfileRepository = studentProfileRepository;
        this.fileUploadService = fileUploadService;
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




    public StudentProfileDTO getProfile(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        StudentProfile studentProfile = studentProfileRepository.findById(user.getId())
                .orElseThrow(() -> new RuntimeException("Student profile not found"));


        return modelMapper.map(studentProfile, StudentProfileDTO.class);

    }


    public void CreateProfile(Long userId, StudentProfileDTO dto, MultipartFile resume, MultipartFile tenth, MultipartFile twelfth, MultipartFile lastsemester) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        StudentProfile profile = studentProfileRepository.findById(userId)
                .orElse(new StudentProfile());

        String resumeUrl = fileUploadService.uploadFile(resume);
        String tenthUrl = fileUploadService.uploadFile(tenth);
        String twelfthUrl = fileUploadService.uploadFile(twelfth);
        String lastSemesterUrl = fileUploadService.uploadFile(lastsemester);

        profile.setUser(user);
        modelMapper.map(dto , profile);
        profile.setResumeUrl(resumeUrl);
        profile.setTenthMarksheetUrl(tenthUrl);
        profile.setTwelfthMarksheetUrl(twelfthUrl);
        profile.setLastSemesterMarkSheetUrl(lastSemesterUrl);

        studentProfileRepository.save(profile);


    }

    public StudentVerifiedDTO verify(Long userId) {
       StudentProfile profile = studentProfileRepository.findById(userId).orElseThrow(
               () -> new RuntimeException("User not found")
       );

      boolean isVerified =  profile.isVerified();
      StudentVerifiedDTO dto = new StudentVerifiedDTO();
       dto.setVerified(isVerified);
       return dto;
    }
}
