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
    long vipPoint = 0;


    @OneToOne
    @JoinColumn(name = "account_id", nullable = false)
    AccountEntity account;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    List<OrderEntity> orders;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    List<ReservationEntity> reservations;

    public void calculatePoint(long addPoint, long minusPoint){
        vipPoint += addPoint;
        vipPoint -= minusPoint;
        if(vipPoint < 0) vipPoint = 0;
    }

}
