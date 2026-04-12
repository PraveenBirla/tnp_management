package tnp_management.tnp.services;

import com.cloudinary.Cloudinary;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tnp_management.tnp.config.CloudinaryConfig;

import java.util.Map;

@Service
public class FileUploadService {

    private final Cloudinary cloudinary;

    public FileUploadService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public String uploadFile(MultipartFile file){
         try{
             Map uploadResult = cloudinary.uploader().upload(
                    file.getBytes(),
                     Map.of(
                             "resource_type", "raw",
                             "folder", "student_docs",
                             "type", "upload"
                     )
             );
             return uploadResult.get("secure_url").toString();
         }
         catch (Exception e){
                  e.printStackTrace();
                  throw new RuntimeException(e.getMessage(),e);
         }
    }
}
