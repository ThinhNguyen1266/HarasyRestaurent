package group5.swp.HarasyProject.entity.account;


import group5.swp.HarasyProject.entity.order.OrderEntity;
import group5.swp.HarasyProject.entity.reservation.ReservationEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "customer_account")
public class CustomerAccountEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_id")
    Integer id;

    @Column(name = "vip_point", nullable = false, columnDefinition = "integer default 0")
    int vipPoint = 0;


    @OneToOne
    @JoinColumn(name = "account_id", nullable = false)
    AccountEntity account;

    @OneToOne(mappedBy = "customer", cascade = CascadeType.ALL)
    OrderEntity order;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    List<ReservationEntity> reservations;
}
