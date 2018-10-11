package hello.hello.Service;

import hello.hello.Dao.CompanyDao;
import hello.hello.Dto.CompanyDto;
import hello.hello.Dto.EmployeeDto;
import hello.hello.Entity.CompanyEntity;
import hello.hello.Entity.EmployeeEntity;
import hello.hello.Util.CommonUtil;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class HelloService {

  @Autowired CompanyDao companyDao;

  /**
   * 会社を取得
   *
   * @return CompanyDto
   */
  public CompanyDto getCompany() {

    CompanyEntity companyEntity = companyDao.searchCompany(1l);
    CompanyDto dto = new CompanyDto();
    BeanUtils.copyProperties(companyEntity, dto);
    dto.setEmployeeDtoList(
        CommonUtil.copyListProperties(companyEntity.getEmployeeEntityList(), EmployeeDto.class));

    return dto;
  }

  /**
   * 単一会社登録
   *
   * @return
   */
  public CompanyEntity insCompany() {

    CompanyEntity insEntity = new CompanyEntity();

    insEntity.setCompanyName("テスト会社");

    List<EmployeeEntity> employeeEntityList = new ArrayList<>();

    EmployeeEntity emp1 = new EmployeeEntity();
    emp1.setEmpname("社員1");
    emp1.setCompany(insEntity);
    employeeEntityList.add(emp1);

    EmployeeEntity emp2 = new EmployeeEntity();
    emp2.setEmpname("社員2");
    emp2.setCompany(insEntity);
    employeeEntityList.add(emp2);

    insEntity.setEmployeeEntityList(employeeEntityList);

    CompanyEntity result = companyDao.insCompany(insEntity);

    return result;
  }
}
