package group5.swp.HarasyProject.entity.branch;

import group5.swp.HarasyProject.entity.Auditable;
import group5.swp.HarasyProject.entity.account.StaffAccountEntity;
import group5.swp.HarasyProject.entity.menu.MenuEntity;
import group5.swp.HarasyProject.entity.order.OrderEntity;
import group5.swp.HarasyProject.entity.reservation.ReservationEntity;
import group5.swp.HarasyProject.enums.Status;
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
@Table(name = "branch")
public class BranchEntity extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "branch_id")
    Integer id;


    @Column(name = "branch_name", nullable = false, unique = true)
    String name;

    @Column(nullable = false)
    String location;

    @Column(name = "branch_image", nullable = false)
    String image;

    @Column(name = "branch_phone", nullable = false)
    String phone;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    Status status = Status.INACTIVE;

    @OneToMany(mappedBy = "branch",cascade = CascadeType.ALL)
    List<StaffAccountEntity> staffs;

    @OneToMany(mappedBy = "branch", cascade = CascadeType.ALL)
    List<BranchWorkingHourEntity> workingHours;

    @OneToMany(mappedBy = "branch", cascade = CascadeType.ALL)
    List<MenuEntity> menus;

    @OneToMany(mappedBy = "branch", cascade = CascadeType.ALL)
    List<TableEntity> tables;

    @OneToMany(mappedBy = "branch", cascade = CascadeType.ALL)
    List<ReservationEntity> reservations;

    @OneToMany(mappedBy = "branch" , cascade = CascadeType.ALL)
    List<OrderEntity> orders;

    public void addWorkingHours(List<BranchWorkingHourEntity> workingHours) {
        if (workingHours != null && !workingHours.isEmpty()) {
            workingHours.forEach(workingHour -> workingHour.setBranch(this));
        }
        if(this.workingHours==null) this.workingHours=new ArrayList<>();
        if(workingHours!=null) this.workingHours.addAll(workingHours);
    }

    public void addTables(List<TableEntity> tables) {
        if (tables != null && !tables.isEmpty()) {
            tables.forEach(table -> table.setBranch(this));
        }
        if(this.tables==null) this.tables=new ArrayList<>();
        if(tables!=null) this.tables.addAll(tables);
    }

    public void addMenus(List<MenuEntity> menus) {
        if (menus != null && !menus.isEmpty()) {
            menus.forEach(menu -> menu.setBranch(this));
        }
        if(this.menus==null) this.menus=new ArrayList<>();
        if(menus!=null) this.menus.addAll(menus);
    }

    public void addStaff(StaffAccountEntity staff) {
        if (staffs == null) staffs = new ArrayList<>();
        staff.setBranch(this);
        staffs.add(staff);
    }




    public boolean isTableInBranch(int tableId){
        return this.getTables().stream().anyMatch(table-> table.getId() == tableId);
    }

}
