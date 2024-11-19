package group5.swp.HarasyProject.entity.order;

import group5.swp.HarasyProject.entity.Auditable;
import group5.swp.HarasyProject.entity.account.CustomerAccountEntity;
import group5.swp.HarasyProject.entity.account.StaffAccountEntity;
import group5.swp.HarasyProject.entity.branch.BranchEntity;
import group5.swp.HarasyProject.entity.branch.TableEntity;
import group5.swp.HarasyProject.entity.reservation.ReservationEntity;
import group5.swp.HarasyProject.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
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

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name = "staff_id")
    StaffAccountEntity staff;

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name = "cus_id")
    CustomerAccountEntity customer;

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name = "branch_id")
    BranchEntity branch;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "orders_table",
            joinColumns = @JoinColumn(name = "order_id"),
            inverseJoinColumns = @JoinColumn(name = "table_id")
    )
    List<TableEntity> tables;

    @OneToOne(mappedBy = "order")
    ReservationEntity reservation;


    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    List<OrderItemEntity> orderItems = new ArrayList<>();

    String note;


    public OrderEntity calculateTotal() {
        if(orderItems!=null && !orderItems.isEmpty()) {
            total = 0;
            orderItems.forEach(orderItem -> total += orderItem.getTotal());
        }
        return this;
    }

    public void addItem(OrderItemEntity orderItem) {
        if(orderItems==null) orderItems = new ArrayList<>();
        orderItems.add(orderItem);
    }

}
