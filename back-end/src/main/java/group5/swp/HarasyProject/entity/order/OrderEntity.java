package group5.swp.HarasyProject.entity.order;

import group5.swp.HarasyProject.entity.Auditable;
import group5.swp.HarasyProject.entity.account.CustomerAccountEntity;
import group5.swp.HarasyProject.entity.account.StaffAccountEntity;
import group5.swp.HarasyProject.entity.branch.TableEntity;
import group5.swp.HarasyProject.entity.reservation.ReservationEntity;
import group5.swp.HarasyProject.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "orders")
public class OrderEntity extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    Integer id;

    @Column(nullable = false)
    long total;

    @Column(name = "payment_status", nullable = false)
    @Enumerated(EnumType.STRING)
    PaymentStatus paymentStatus;

    @ManyToOne
    @JoinColumn(name = "staff_id")
    StaffAccountEntity staff;

    @OneToOne
    @JoinColumn(name = "cus_id")
    CustomerAccountEntity customer;


    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "orders_table",
            joinColumns = @JoinColumn(name = "order_id"),
            inverseJoinColumns = @JoinColumn(name = "table_id")
    )
    List<TableEntity> tables;

    @OneToMany(mappedBy = "order")
    List<OrderItem> orderItems;


    @OneToOne(mappedBy = "order")
    ReservationEntity reservation;
}
