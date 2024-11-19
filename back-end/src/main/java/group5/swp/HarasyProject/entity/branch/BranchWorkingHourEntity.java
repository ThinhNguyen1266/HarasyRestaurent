package group5.swp.HarasyProject.entity.branch;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.DayOfWeek;
import java.time.LocalTime;

@Entity
@Getter
@Setter
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
    LocalTime openingTime;

    @Column(name = "closing_time", nullable = false)
    LocalTime closingTime;

    @ManyToOne
    @JoinColumn(name = "branch_id")

    BranchEntity branch;
}
