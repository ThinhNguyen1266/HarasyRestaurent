package group5.swp.HarasyProject.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestControlller {

    @GetMapping("/")
    public String index() {
        return  "hello";
    }


}
