package hello.hello.Dto;

import hello.hello.Entity.EmployeeEntity;
import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Data
public class CompanyDto {
  private Long companyId;
  private String companyName;
  private List<EmployeeEntity> employeeList;
}
