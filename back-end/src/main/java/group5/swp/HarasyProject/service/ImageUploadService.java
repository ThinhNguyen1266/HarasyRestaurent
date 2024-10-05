package group5.swp.HarasyProject.service;


import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.UploadImageResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;

@Service
public interface ImageUploadService {
    public ApiResponse<UploadImageResponse> uploadImage(MultipartFile file)throws IOException;
}
