package tnp_management.tnp.services;


import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import tnp_management.tnp.Entities.StudentProfile;

import tnp_management.tnp.Entities.User;
import tnp_management.tnp.dto.StudentProfileResponseDTO;
import tnp_management.tnp.repositories.StudentProfileRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminStudentService {

    private final StudentProfileRepository studentProfileRepository;
    private final ModelMapper modelMapper ;

    public AdminStudentService(StudentProfileRepository studentProfileRepository, ModelMapper modelMapper) {
        this.studentProfileRepository = studentProfileRepository;
        this.modelMapper = modelMapper;
    }

    public Page<StudentProfileResponseDTO> getFilteredStudents(String branch, Integer year, Integer page , Integer size) {

        Page<StudentProfile> students ;



        Pageable pageable = PageRequest.of(page ,size);

        if (branch == null && year == null)
             students =  studentProfileRepository.findAll(pageable);
         else
             students = studentProfileRepository.findStudentsByFilters(branch , year , pageable);

         return students.map(student ->
                modelMapper.map(student, StudentProfileResponseDTO.class)
        );
    }

    public void verifyStudent(Long userId) {
          StudentProfile studentProfile = studentProfileRepository.findById(userId)
                  .orElseThrow(() -> new RuntimeException("Student Not Found"));

           studentProfile.setVerified(true);
           studentProfileRepository.save(studentProfile);
    }
}
