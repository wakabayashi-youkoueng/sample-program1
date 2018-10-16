package hello.hello.Dto;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Data
public class CompanyDto {
  private Long companyId;
  private String companyName;
  private List<EmployeeDto> employeeDtoList;
}
