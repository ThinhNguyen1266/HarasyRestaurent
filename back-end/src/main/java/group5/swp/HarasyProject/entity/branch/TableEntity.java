package group5.swp.HarasyProject.entity.branch;


import group5.swp.HarasyProject.entity.Auditable;
import group5.swp.HarasyProject.entity.order.OrderEntity;
import group5.swp.HarasyProject.entity.reservation.ReservationEntity;
import group5.swp.HarasyProject.enums.TableStatus;
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
    TableStatus status = TableStatus.UNAVAILABLE;

    @Column(nullable = false)
    int capacity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id")
    BranchEntity branch;

    @ManyToMany(mappedBy = "tables")
    List<OrderEntity> orders;


    @ManyToMany
    @JoinTable(
            name = "reservation_table",
            joinColumns = @JoinColumn(name = "table_id"),
            inverseJoinColumns = @JoinColumn(name = "reservation_id")
    )

    List<ReservationEntity> reservations;

    public TableEntity order() {
        status = TableStatus.UNAVAILABLE;
        return this;
    }

    public void addOrder(OrderEntity order) {
        if(orders == null) orders = new ArrayList<>();
        orders.add(order);
    }
}
