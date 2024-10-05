package group5.swp.HarasyProject.controller;


import group5.swp.HarasyProject.dto.response.ApiResponse;
import group5.swp.HarasyProject.dto.response.UploadImageResponse;
import group5.swp.HarasyProject.service.ImageUploadService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class UploadImageController {
    ImageUploadService imageUploadService;

    @PostMapping("/uploadImage")
    public ApiResponse<UploadImageResponse> upload(@RequestParam("file") MultipartFile file) throws IOException {
        return imageUploadService.uploadImage(file);
    }

}
