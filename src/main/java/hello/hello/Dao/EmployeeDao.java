package hello.hello.Dao;

import hello.hello.Entity.EmployeeEntity;
import hello.hello.Repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class EmployeeDao {

  @Autowired EmployeeRepository empRepository;

  /**
   * 社員全件検索
   *
   * @return employeeList
   */
  public List<EmployeeEntity> searchAll() {
    List<EmployeeEntity> employeeList = empRepository.findAll();
    return employeeList;
  }
}
