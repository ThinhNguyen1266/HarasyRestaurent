package group5.swp.HarasyProject.entity.reservation;

import com.fasterxml.jackson.annotation.JsonFormat;
import group5.swp.HarasyProject.entity.Auditable;
import group5.swp.HarasyProject.entity.account.CustomerAccountEntity;
import group5.swp.HarasyProject.entity.branch.BranchEntity;
import group5.swp.HarasyProject.entity.branch.TableEntity;
import group5.swp.HarasyProject.entity.order.OrderEntity;
import group5.swp.HarasyProject.enums.ReservationStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "reservation")
public class ReservationEntity extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reservation_id")
    Integer id;

    @Column(name = "reservation_date", nullable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    LocalDate date;

    @Column(name = "reservation_time", nullable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
    LocalTime time;

    @Column(name = "amount_guest", nullable = false)
    int amountGuest;

    @Column(nullable = false)
    int price;

    int deposit = 0;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    ReservationStatus status = ReservationStatus.PENDING;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    CustomerAccountEntity customer;

    @ManyToOne
    @JoinColumn(name = "branch_id")
    BranchEntity branch;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "order_id")
    OrderEntity order;

    @ManyToMany
    @JoinTable(
            name = "reservation_table",
            joinColumns = @JoinColumn(name = "reservation_id"),
            inverseJoinColumns = @JoinColumn(name = "table_id")
    )
    List<TableEntity> tables;

    @ManyToOne
    @JoinColumn(name = "reservation_type_id")
    ReservationTypeEntity type;



}
