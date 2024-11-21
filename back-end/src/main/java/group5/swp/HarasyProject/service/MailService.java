package group5.swp.HarasyProject.service;


import group5.swp.HarasyProject.dto.request.auth.EmailRequest;
import group5.swp.HarasyProject.entity.reservation.ReservationEntity;
import jakarta.mail.MessagingException;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public interface MailService {
    void sendOtpMail(EmailRequest emailRequest, String otp) throws MessagingException, IOException;
    void reserveReminder(EmailRequest emailRequest, ReservationEntity reserve) throws MessagingException, IOException;
}
