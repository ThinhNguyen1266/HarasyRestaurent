package group5.swp.HarasyProject.entity.order;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import thinh.Kaka.entity.Auditable;
import thinh.Kaka.entity.account.CustomerAccountEntity;
import thinh.Kaka.entity.account.StaffAccountEntity;
import thinh.Kaka.entity.branch.TableEntity;
import thinh.Kaka.entity.reservation.ReservationEntity;
import thinh.Kaka.enums.PaymentStatus;

import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
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

    @Column(name="payment_status",nullable = false)
    @Enumerated(EnumType.STRING)
    PaymentStatus paymentStatus;

    @ManyToOne
    @JoinColumn(name = "staff_id")
    StaffAccountEntity staff;

    @OneToOne
    @JoinColumn(name="cus_id")
    CustomerAccountEntity customer;


    @ManyToMany
    @JoinTable(
            name = "orders_table",
            joinColumns = @JoinColumn(name = "order_id"),
            inverseJoinColumns = @JoinColumn(name = "table_id")
    )
    Set<TableEntity> tables;

    @OneToMany(mappedBy = "order")
    Set<OrderItem> orderItems;


    @OneToOne(mappedBy = "order")
    ReservationEntity reservation;
}
