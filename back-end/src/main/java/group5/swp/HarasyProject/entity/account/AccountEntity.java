package group5.swp.HarasyProject.entity.account;


import com.fasterxml.jackson.annotation.JsonFormat;
import group5.swp.HarasyProject.entity.Auditable;
import group5.swp.HarasyProject.enums.Account.AccountStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;


@EqualsAndHashCode(callSuper = true)
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "account")
public class AccountEntity extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_id")
    Integer id;

    @Column(nullable = false, unique = true)
    String username;

    @Column(nullable = false)
    String password;

    @Column(nullable = false)
    String email;

    @Column(nullable = false)
    String fullName;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    Date dob;

    @Column(name = "phone_number")
    String phone;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    AccountStatus status = AccountStatus.PENDING;


    @OneToOne(mappedBy = "account", cascade = CascadeType.ALL)

    CustomerAccountEntity customer;


    @OneToOne(mappedBy = "account", cascade = CascadeType.ALL)

    StaffAccountEntity staff;


    public void setCustomer(CustomerAccountEntity customerAccount) {
        this.customer = customerAccount;
        if (customerAccount != null) {
            customerAccount.setAccount(this);
        }
    }

    public void setStaff(StaffAccountEntity staffAccount) {
        this.staff = staffAccount;
        if (staffAccount != null) {
            staffAccount.setAccount(this);
        }
    }
}
