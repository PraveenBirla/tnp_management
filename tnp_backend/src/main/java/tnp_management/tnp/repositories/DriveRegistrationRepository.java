package tnp_management.tnp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tnp_management.tnp.Entities.DriveRegistration;
import tnp_management.tnp.Entities.PlacementDrive;
import tnp_management.tnp.Entities.StudentProfile;

import java.util.List;
@Repository
public interface DriveRegistrationRepository extends JpaRepository<DriveRegistration , Long> {

    boolean existsByStudentAndPlacementDrive(StudentProfile student, PlacementDrive drive);


    List<DriveRegistration> findByPlacementDriveId(Long driveId);


}
