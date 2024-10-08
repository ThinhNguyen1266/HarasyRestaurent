package group5.swp.HarasyProject.entity.branch;

import group5.swp.HarasyProject.enums.DayOfWeek;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;


import java.sql.Time;
import java.time.LocalTime;

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
    LocalTime openingTime;

    @Column(name = "closing_time", nullable = false)
    LocalTime closingTime;

    @ManyToOne
    @JoinColumn(name = "branch_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    BranchEntity branch;
}
