package hello.hello.Entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "t_schedule")
public class ScheduleEntity extends AbstractEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "scheduleId")
  private Long id;

  private Long timeline;
  private Long start;
  private Long end;
  private String text;
}
