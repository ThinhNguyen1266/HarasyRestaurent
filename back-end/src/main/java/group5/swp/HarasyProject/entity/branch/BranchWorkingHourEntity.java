package group5.swp.HarasyProject.entity.branch;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import thinh.Kaka.enums.DayOfWeek;

import java.sql.Time;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "branch_working_hour")
public class BranchWorkingHourEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bwh_id")
    Integer id;

    @Column(name = "day_of_week", nullable = false)
    @Enumerated(EnumType.STRING)
    DayOfWeek dayOfWeek;

    @Column(name = "opening_time", nullable = false)
    Time openingTime;

    @Column(name = "closing_time", nullable = false)
    Time closingTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id")
    BranchEntity branch;
}
