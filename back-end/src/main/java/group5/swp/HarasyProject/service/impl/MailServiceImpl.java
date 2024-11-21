package group5.swp.HarasyProject.service.impl;

import group5.swp.HarasyProject.dto.request.auth.EmailRequest;
import group5.swp.HarasyProject.entity.reservation.ReservationEntity;
import group5.swp.HarasyProject.service.MailService;
import group5.swp.HarasyProject.service.OtpService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;


import java.io.IOException;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@RequiredArgsConstructor
public class MailServiceImpl implements MailService {

    String HOST_NAME = "ThinhNgyenCTH@gmail.com";

    JavaMailSender mailSender;

    OtpService otpService;

    @Override
    public void sendOtpMail(EmailRequest request, String otp) throws MessagingException, IOException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);
        helper.setFrom(HOST_NAME);
        helper.setTo(request.getTo());
        helper.setSubject(request.getSubject());
        Resource resource = new ClassPathResource("/templates/email/otp.html");
        String content = new String(resource.getInputStream().readAllBytes());
        content = content.replace("{{otp}}", otp);
        helper.setText(content, true);
        mailSender.send(mimeMessage);
    }

    @Override
    public void reserveReminder(EmailRequest request, ReservationEntity reserve) throws MessagingException, IOException {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);
            helper.setFrom(HOST_NAME);
            helper.setTo(request.getTo());
            helper.setSubject(request.getSubject());
            Resource resource = new ClassPathResource("/templates/email/reminder.html");
            String content = new String(resource.getInputStream().readAllBytes());
            content = content.replace("{{username}}", reserve.getCustomer().getAccount().getFullName());
            helper.setText(content, true);
            mailSender.send(mimeMessage);
    }
}
