package hello.hello.Dto;

import lombok.Data;
import org.springframework.stereotype.Component;

@Component
@Data
public class EmployeeDto {

	private Long id;
	private String empname;

}
