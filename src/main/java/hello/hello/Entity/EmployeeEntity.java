package hello.hello.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "m_emp")
@Data
@ToString(exclude = {"company"})
public class EmployeeEntity extends AbstractEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long empId;

  private String empname;

  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "companyId", referencedColumnName = "companyId")
  @JsonIgnore
  private CompanyEntity company;
}
