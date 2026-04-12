package tnp_management.tnp.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tnp_management.tnp.Entities.User;
import tnp_management.tnp.dto.StudentProfileRequestDTO;
import tnp_management.tnp.dto.StudentProfileResponseDTO;
import tnp_management.tnp.dto.StudentVerifiedDTO;
import tnp_management.tnp.services.StudentService;

@RestController
@RequestMapping("api/student")
public class StudentController {

    private final StudentService studentService;


    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping(value = "/create-profile" , consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<Void> createProfile(Authentication authentication ,
                                              @RequestPart("data") StudentProfileRequestDTO dto,
                                              @RequestPart("resume")MultipartFile resume,
                                              @RequestPart("tenth") MultipartFile tenth,
                                              @RequestPart("twelfth") MultipartFile twelfth,
                                              @RequestPart("lastsemester") MultipartFile lastsemester){
        User user = (User) authentication.getPrincipal();
        Long userId = user.getId();
        studentService.CreateProfile(userId , dto , resume , tenth , twelfth , lastsemester);
        return ResponseEntity.ok().build();

    }

    @PutMapping(value = "/update-profile")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<StudentProfileRequestDTO> updateMyProfile(Authentication authentication ,
                                                                    @RequestBody StudentProfileRequestDTO studentProfileRequestDTO){
        User user = (User) authentication.getPrincipal();
         Long userId = user.getId();

        StudentProfileRequestDTO updated = studentService.updateProfile(userId , studentProfileRequestDTO);
        return ResponseEntity.ok(updated);
    }

   @GetMapping("/get-profile")
   @PreAuthorize("hasRole('STUDENT')")
    public  ResponseEntity<StudentProfileResponseDTO> myProfile(Authentication authentication){
        User user =  (User) authentication.getPrincipal();
        Long userId = user.getId();
        StudentProfileResponseDTO dto = studentService.getProfile(userId);
        return  ResponseEntity.ok(dto);
   }

   @GetMapping("/profile/verify")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<StudentVerifiedDTO> verifyProfile(Authentication authentication){
        User user = (User) authentication.getPrincipal();
        Long userId = user.getId();
        StudentVerifiedDTO dto = studentService.verify(userId);
        return ResponseEntity.ok(dto);
   }



}
