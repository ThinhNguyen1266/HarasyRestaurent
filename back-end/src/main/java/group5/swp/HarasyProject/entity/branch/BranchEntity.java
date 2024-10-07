package group5.swp.HarasyProject.entity.branch;

import group5.swp.HarasyProject.entity.Auditable;
import group5.swp.HarasyProject.entity.account.StaffAccountEntity;
import group5.swp.HarasyProject.entity.menu.MenuEntity;
import group5.swp.HarasyProject.entity.reservation.ReservationEntity;
import group5.swp.HarasyProject.enums.Status;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;


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


    @Column(name = "branch_name", nullable = false,unique = true)
    String name;

    @Column(nullable = false)
    String location;

    @Column(name="branch_image",nullable = false)
    String image;
    
    @Column(name = "branch_phone", nullable = false)
    String phone;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    Status status = Status.INACTIVE;

    @OneToMany(mappedBy = "branch")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    Set<StaffAccountEntity> staffs;

    @OneToMany(mappedBy = "branch", cascade = CascadeType.ALL)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    Set<BranchWorkingHourEntity> workingHours;

    @OneToMany(mappedBy = "branch", cascade = CascadeType.ALL)
    Set<MenuEntity> menus;

    @OneToMany(mappedBy = "branch",cascade = CascadeType.ALL)
    Set<TableEntity> tables;

    @OneToMany(mappedBy = "branch",cascade = CascadeType.ALL)
    Set<ReservationEntity> reservations;
}
