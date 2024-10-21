package group5.swp.HarasyProject.entity.reservation;

import group5.swp.HarasyProject.entity.Auditable;
import group5.swp.HarasyProject.entity.account.CustomerAccountEntity;
import group5.swp.HarasyProject.entity.branch.BranchEntity;
import group5.swp.HarasyProject.entity.branch.TableEntity;
import group5.swp.HarasyProject.entity.order.OrderEntity;
import group5.swp.HarasyProject.enums.ReservationStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;


import java.sql.Timestamp;
import java.util.List;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
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
    Timestamp reservationDate;

    @Column(name = "amount_guest", nullable = false)
    int amountGuest;

    @Column(nullable = false)
    int price;

    int deposit=0;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    ReservationStatus status = ReservationStatus.PENDING;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    CustomerAccountEntity customer;

    @ManyToOne
    @JoinColumn(name = "branch_id")
    BranchEntity branch;

    @OneToOne
    @JoinColumn(name ="order_id")
    OrderEntity order;

    @ManyToMany(mappedBy = "reservations", cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    List<TableEntity> tables;
}
