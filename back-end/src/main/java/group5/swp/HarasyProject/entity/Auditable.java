package group5.swp.HarasyProject.entity;


import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.sql.Timestamp;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class Auditable {


    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    @Column(updatable = false, name = "created_date")
    Timestamp createdDate;

    @LastModifiedDate
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updated_date", insertable = false)
    Timestamp updatedDate;

    @CreatedBy
    @Column(name = "created_by", updatable = false)
    String createdBy;


    @LastModifiedBy
    @Column(name = "updated_by", insertable = false)
    String updateBy;
}
