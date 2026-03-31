package tnp_management.tnp.services;


import org.springframework.stereotype.Service;
import tnp_management.tnp.dto.StudentListDTO;
import tnp_management.tnp.repositories.StudentProfileRepository;

import java.util.List;

@Service
public class AdminService {

    private final StudentProfileRepository studentProfileRepository;

    public AdminService(StudentProfileRepository studentProfileRepository) {
        this.studentProfileRepository = studentProfileRepository;
    }

    public List<StudentListDTO> getFilteredStudents(String branch, Integer year) {

        if (branch == null && year == null) {
            return studentProfileRepository.findAllStudentsCustom();
        }

        return studentProfileRepository.findStudentsByFilters(branch , year);
    }
}
