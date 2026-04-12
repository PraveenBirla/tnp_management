package tnp_management.tnp.services;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.concurrent.CompletableFuture;

@Service
public class AsyncUploadeService {

    private final CloudinaryService cloudinaryService;


    public AsyncUploadeService(CloudinaryService cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
    }

    @Async
    public CompletableFuture<String> uploadAsync(MultipartFile file) {
        String url = cloudinaryService.uploadFile(file);
        return CompletableFuture.completedFuture(url);
    }
}
