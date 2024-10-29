package group5.swp.HarasyProject.controller;


import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;

@RestController
public class TestControlller {

    @GetMapping("/")
    public String index() {
        return  "hello";
    }


    @GetMapping("/set-cookie")
    public ResponseEntity<Void> setCookie(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("testCookie", "testValue")
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(Duration.ofDays(1))
                .sameSite("Lax")
                .build();
        response.addHeader("Set-Cookie", cookie.toString());
        return ResponseEntity.ok().build();
    }
}
