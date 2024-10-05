package group5.swp.HarasyProject.entity.branch;


import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import thinh.Kaka.entity.Auditable;
import thinh.Kaka.entity.order.OrderEntity;
import thinh.Kaka.entity.reservation.ReservationEntity;
import thinh.Kaka.enums.Status;

import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "tables")
public class TableEntity extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "table_id")
    Integer id;

    @Column(name = "table_number", nullable = false)
    int number;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    Status status=Status.ACTIVE;

    @Column(nullable = false)
    int capacity;

    @ManyToOne
    @JoinColumn(name = "branch_id")
    BranchEntity branch;

    @ManyToMany(mappedBy = "tables")
    Set<OrderEntity> orders;


    @ManyToMany
    @JoinTable(
            name = "reservation_table",
            joinColumns = @JoinColumn(name = "table_id"),
            inverseJoinColumns  = @JoinColumn(name = "reservation_id")
    )
    Set<ReservationEntity> reservations;
}
