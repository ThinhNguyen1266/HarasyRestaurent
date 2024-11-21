package group5.swp.HarasyProject.config;

import group5.swp.HarasyProject.dto.request.auth.EmailRequest;
import group5.swp.HarasyProject.entity.reservation.ReservationEntity;
import group5.swp.HarasyProject.repository.ReservationRepository;
import group5.swp.HarasyProject.service.MailService;
import jakarta.mail.MessagingException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Component
@Slf4j
public class ReserveReminderScheduler {
    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private MailService mailService;

    @Scheduled(cron = "0 0,30 * * * *")
    public void checkAndSendReminders() throws MessagingException, IOException {
        LocalDate nowDate = LocalDate.now();
        LocalTime nowTime = LocalTime.now();
        log.info("Đang kiểm tra vào lúc: {} : {} ", nowDate, nowTime);
        processUpcomingBookings(nowDate,nowTime);
    }

    private void processUpcomingBookings(LocalDate nowDate, LocalTime nowTime) throws MessagingException, IOException {
        LocalTime start = nowTime.plusMinutes(1);
        LocalTime end = nowTime.plusMinutes(30);
        List<ReservationEntity> reserve = reservationRepository.findReservationBetween(nowDate,start,end);
        for (ReservationEntity reservation : reserve) {
            String mail = reservation.getCustomer().getAccount().getEmail();
            EmailRequest emailRequest = EmailRequest.builder().to(mail).subject("Reminder").build();
            mailService.reserveReminder(emailRequest,reservation);
        }
        System.out.println("Đã gửi thông báo cho người dùng.");
    }
}
