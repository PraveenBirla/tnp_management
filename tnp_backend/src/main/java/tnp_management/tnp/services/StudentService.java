package tnp_management.tnp.services;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tnp_management.tnp.Entities.StudentProfile;
import tnp_management.tnp.Entities.User;
import tnp_management.tnp.dto.StudentProfileRequestDTO;
import tnp_management.tnp.dto.StudentProfileResponseDTO;
import tnp_management.tnp.dto.StudentVerifiedDTO;
import tnp_management.tnp.repositories.StudentProfileRepository;
import tnp_management.tnp.repositories.UserRepository;

import java.util.concurrent.CompletableFuture;

@Service
public class StudentService {

    private final UserRepository userRepository;

    private final AsyncUploadeService uploadeService;

    private final ModelMapper modelMapper;

    private final StudentProfileRepository studentProfileRepository;




    public StudentService(UserRepository userRepository, AsyncUploadeService uploadeService, ModelMapper modelMapper, StudentProfileRepository studentProfileRepository ) {
        this.userRepository = userRepository;
        this.uploadeService = uploadeService;
        this.modelMapper = modelMapper;
        this.studentProfileRepository = studentProfileRepository;

    }

    public StudentProfileRequestDTO updateProfile(Long userId, StudentProfileRequestDTO studentProfileRequestDTO) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        StudentProfile studentProfile = studentProfileRepository.findById(user.getId()).
                orElse(new StudentProfile());

        modelMapper.map(studentProfileRequestDTO, studentProfile);


        studentProfile.setUser(user);

         StudentProfile savedProfile = studentProfileRepository.save(studentProfile);

        return modelMapper.map( savedProfile, StudentProfileRequestDTO.class);

    }




    public StudentProfileResponseDTO getProfile(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        StudentProfile studentProfile = studentProfileRepository.findById(user.getId())
                .orElseThrow(() -> new RuntimeException("Student profile not found"));


        return modelMapper.map(studentProfile, StudentProfileResponseDTO.class);

    }


    public void CreateProfile(Long userId, StudentProfileRequestDTO dto, MultipartFile resume, MultipartFile tenth, MultipartFile twelfth, MultipartFile lastsemester) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        StudentProfile profile = studentProfileRepository.findById(userId)
                .orElse(new StudentProfile());



        CompletableFuture<String> resumeUrl =  uploadeService.uploadAsync(resume);
        CompletableFuture<String> tenthUrl = uploadeService.uploadAsync( tenth);
        CompletableFuture<String> twelfthUrl = uploadeService.uploadAsync(twelfth);
        CompletableFuture<String> lastSemesterUrl = uploadeService.uploadAsync(lastsemester);

        CompletableFuture.allOf(resumeUrl,tenthUrl,twelfthUrl, lastSemesterUrl);

        try {
            profile.setUser(user);
            modelMapper.map(dto, profile);
            profile.setResumeUrl(resumeUrl.get());
            profile.setTenthMarksheetUrl(tenthUrl.get());
            profile.setTwelfthMarksheetUrl(twelfthUrl.get());
            profile.setLastSemesterMarkSheetUrl(lastSemesterUrl.get());
        }
        catch (Exception e){
            throw new RuntimeException("Error getting upload results");
        }
        studentProfileRepository.save(profile);


    }

    public StudentVerifiedDTO verify(Long userId) {
       StudentProfile profile = studentProfileRepository.findById(userId).orElseThrow(
               () -> new RuntimeException("User not found")
       );

      StudentVerifiedDTO dto = new StudentVerifiedDTO();
       dto.setVerified(profile.isVerified());
       dto.setBranch(profile.getBranch());
       dto.setFullName(profile.getFullName());
       dto.setStudentEnrollmentNo(profile.getStudentEnrollmentNo());
       return dto;
    }
}
