package group5.swp.HarasyProject.config;


import com.github.javafaker.Faker;
import group5.swp.HarasyProject.entity.account.AccountEntity;
import group5.swp.HarasyProject.entity.account.CustomerAccountEntity;
import group5.swp.HarasyProject.entity.account.StaffAccountEntity;
import group5.swp.HarasyProject.entity.branch.BranchEntity;
import group5.swp.HarasyProject.entity.branch.BranchWorkingHourEntity;
import group5.swp.HarasyProject.enums.Account.AccountStatus;
import group5.swp.HarasyProject.enums.Account.StaffRole;
import group5.swp.HarasyProject.enums.DayOfWeek;
import group5.swp.HarasyProject.enums.Status;
import group5.swp.HarasyProject.repository.AccountRepository;
import group5.swp.HarasyProject.repository.BranchRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;


import java.text.SimpleDateFormat;
import java.time.LocalTime;
import java.util.*;

@Configuration
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AppConfig {

    PasswordEncoder passwordEncoder;

    @NonFinal
    static final String ADMIN_USER_NAME = "admin";

    @NonFinal
    static final String ADMIN_PASSWORD = "admin";

    @Bean
    ApplicationRunner applicationRunner(AccountRepository accountRepository, BranchRepository branchRepository) {
        return args -> {
            if (accountRepository.findByUsername(ADMIN_USER_NAME).isEmpty()) {
                AccountEntity account = AccountEntity.builder()
                        .username(ADMIN_USER_NAME)
                        .password(passwordEncoder.encode(ADMIN_PASSWORD))
                        .email("admin@example.com")
                        .status(AccountStatus.ACTIVE)
                        .fullName("Admin dep trai")
                        .build();
                account.setStaff(StaffAccountEntity.builder()
                        .role(StaffRole.ADMIN)
                        .picture("admin picture")
                        .build());
                log.info("Saving admin account {}", account);
                accountRepository.save(account);
                log.warn("admin user has been created with default password: admin, please change it");
                Faker faker = new Faker();
                for (int i = 0; i < 3; i++) {
                    String email = faker.internet().emailAddress();
                    String phone = faker.phoneNumber().phoneNumber();
                    String fullName = faker.name().fullName();
                    String username = faker.name().firstName();
                    String password = "thinh";
                    Date dateOfBirth = faker.date().birthday();
                    SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
                    String formattedDate = formatter.format(dateOfBirth);
                    dateOfBirth = formatter.parse(formattedDate);
                    AccountEntity cusAccount = AccountEntity.builder()
                            .username(username)
                            .password(passwordEncoder.encode(password))
                            .email(email)
                            .phone(phone)
                            .fullName(fullName)
                            .status(AccountStatus.ACTIVE)
                            .dob(dateOfBirth)
                            .build();
                    cusAccount.setCustomer(new CustomerAccountEntity());
                    accountRepository.save(cusAccount);
                    formatter = new SimpleDateFormat("dd-MM-yyyy");
                    dateOfBirth = formatter.parse(formattedDate);
                    BranchEntity branch = BranchEntity.builder()
                            .name(faker.funnyName().name())
                            .image("/iamge2")
                            .location((faker.address().streetAddress()))
                            .phone(faker.phoneNumber().phoneNumber())
                            .staffs(new HashSet<>())
                            .status(Status.ACTIVE)
                            .build();
                    Set<BranchWorkingHourEntity> workingHours = new HashSet<>();
                    for (int j = 0; j < 4; j++) {
                        BranchWorkingHourEntity workingHour = BranchWorkingHourEntity.builder()
                                .dayOfWeek(
                                        switch (j){
                                            case 0 -> DayOfWeek.MONDAY;
                                            case 1 -> DayOfWeek.TUESDAY;
                                            case 2 -> DayOfWeek.WEDNESDAY;
                                            case 3 -> DayOfWeek.THURSDAY;
                                            default -> DayOfWeek.FRIDAY;
                                        }
                                )
                                .openingTime(LocalTime.of(3,0))
                                .closingTime(LocalTime.of(5,5))
                                .branch(branch)
                                .build();
                        workingHours.add(workingHour);
                    }
                    branch.setWorkingHours(workingHours);
                    branchRepository.save(branch);
                    for (int j = 0; j < 4; j++) {
                        AccountEntity staffAccount = AccountEntity.builder()
                                .username( faker.name().firstName())
                                .password(passwordEncoder.encode(password))
                                .email(faker.internet().emailAddress())
                                .phone(faker.phoneNumber().phoneNumber())
                                .fullName(faker.name().fullName())
                                .status(AccountStatus.ACTIVE)
                                .dob(dateOfBirth)
                                .build();
                        StaffAccountEntity staff= StaffAccountEntity.builder()
                                .role(j == 0
                                        ? StaffRole.BRANCH_MANAGER
                                        : j == 1
                                        ? StaffRole.CHEF
                                        : j == 2
                                        ? StaffRole.RECEPTIONIST
                                        : StaffRole.WAITER)
                                .bankAccount(faker.business().creditCardNumber())
                                .bankName(faker.business().creditCardType())
                                .salary(2000)
                                .picture("/image")
                                .branch(branch)
                                .build();
                        staffAccount.setStaff(staff);
                        accountRepository.save(staffAccount);
                    }
                }
            }



        };
    }

}
