package hello.hello.Dto;

import lombok.Data;
import org.springframework.stereotype.Component;

@Component
@Data
public class ScheduleDto {

  private Long id;

  private Long timeline;
  private Long start;
  private Long end;
  private String text;
}
