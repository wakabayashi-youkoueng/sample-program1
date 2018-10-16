package hello.hello.Entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import java.sql.Timestamp;

@Data
@MappedSuperclass
public class AbstractEntity {

  @Column(updatable = false)
  private Timestamp regDateTime;

  private Timestamp updDateTime;
  private boolean isDelete;
  private Timestamp delDateTime;

  @PrePersist
  public void onPrePersist() {
    setRegDateTime(new Timestamp(System.currentTimeMillis()));
    setUpdDateTime(new Timestamp(System.currentTimeMillis()));
  }

  @PreUpdate
  public void onPreUpdate() {
    setUpdDateTime(new Timestamp(System.currentTimeMillis()));
  }
}
