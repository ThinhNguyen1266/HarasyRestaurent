package group5.swp.HarasyProject.entity.account;


import group5.swp.HarasyProject.entity.branch.BranchEntity;
import group5.swp.HarasyProject.entity.order.OrderEntity;
import group5.swp.HarasyProject.enums.Account.StaffRole;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;


import java.util.List;
import java.util.Set;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "staff_account")
public class StaffAccountEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "staff_account_id")
    Integer id;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    StaffRole role;


    @Column( name ="bank_account")
    String bankAccount;

    @Column(name = "bank_name")
    String bankName;

    @Column(nullable = false)
    String picture;
    @Column(nullable = false)
    int salary;

    @OneToOne
    @JoinColumn(name = "account_id", nullable = false)
    @ToString.Exclude
    AccountEntity account;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id")
    BranchEntity branch;

    @OneToMany(mappedBy = "staff",cascade = CascadeType.ALL)
    List<OrderEntity> orders;
}
