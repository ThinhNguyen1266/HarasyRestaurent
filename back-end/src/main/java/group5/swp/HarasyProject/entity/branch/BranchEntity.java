package group5.swp.HarasyProject.entity.branch;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import thinh.Kaka.entity.Auditable;
import thinh.Kaka.entity.account.StaffAccountEntity;
import thinh.Kaka.entity.menu.MenuEntity;
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
@Table(name = "branch")
public class BranchEntity extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "branch_id")
    Integer id;


    @Column(name = "branch_name", nullable = false)
    String name;

    @Column(nullable = false)
    String location;


    @Column(name="branch_image",nullable = false)
    String image;
    
    @Column(name = "branch_phone", nullable = false)
    String phone;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    Status status = Status.ACTIVE;

    @OneToMany(mappedBy = "branch")
    Set<StaffAccountEntity> staffs;

    @OneToMany(mappedBy = "branch", cascade = CascadeType.ALL)
    Set<BranchWorkingHourEntity> workingHours;

    @OneToMany(mappedBy = "branch", cascade = CascadeType.ALL)
    Set<MenuEntity> menus;

    @OneToMany(mappedBy = "branch",cascade = CascadeType.ALL)
    Set<TableEntity> tables;

    @OneToMany(mappedBy = "branch",cascade = CascadeType.ALL)
    Set<ReservationEntity> reservations;
}
