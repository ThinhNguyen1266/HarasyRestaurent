package group5.swp.HarasyProject.entity.reservation;

import group5.swp.HarasyProject.enums.ReservationType;
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
@Table(name = "reservation_type")
public class ReservationTypeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reservation_type_id")
    Integer id;

    @Column(name = "reservation_type", nullable = false)
    @Enumerated(EnumType.STRING)
    ReservationType reservationType = ReservationType.GENERAL;

    @OneToMany(mappedBy = "type")
    List<ReservationEntity> reservations;

    @Column(name = "min_price", nullable = false)
    long minPrice;
}
