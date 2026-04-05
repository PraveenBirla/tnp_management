package tnp_management.tnp.services;


import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import tnp_management.tnp.Entities.StudentProfile;
import tnp_management.tnp.dto.StudentListDTO;
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

    public List<StudentListDTO> getFilteredStudents(String branch, Integer year) {
    List<StudentProfile> students ;

        if (branch == null && year == null)
             students =  studentProfileRepository.findAllStudentsCustom();
         else
             students = studentProfileRepository.findStudentsByFilters(branch , year);

         return students.stream().
                 map(studentProfile -> modelMapper.map(studentProfile , StudentListDTO.class))
                 .collect(Collectors.toList());
    }
}
