package hello.hello;

import hello.hello.Dao.CompanyDao;
import hello.hello.Dto.CompanyDto;
import hello.hello.Dto.EmployeeDto;
import hello.hello.Entity.CompanyEntity;
import hello.hello.Entity.EmployeeEntity;
import hello.hello.Service.HelloService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class HelloApplicationTests {

  // Daoをモックする
  @Mock private CompanyDao companyDao;

  // モックオブジェクトの挿入対象
  @InjectMocks private HelloService helloService;

  private CompanyEntity companyEntity = new CompanyEntity();
  private List<EmployeeEntity> employeeEntityList = new ArrayList<>();

  private CompanyDto companyDto = new CompanyDto();
  private List<EmployeeDto> employeeDtoList = new ArrayList<>();

  @Before
  public void setup() {

    EmployeeDto employeeDto1 = new EmployeeDto();
    employeeDto1.setEmpId(1l);
    employeeDto1.setEmpname("あああ");
    EmployeeDto employeeDto2 = new EmployeeDto();
    employeeDto2.setEmpId(2l);
    employeeDto2.setEmpname("いいい");
    this.employeeDtoList.add(employeeDto1);
    this.employeeDtoList.add(employeeDto2);

    companyDto.setCompanyId(1l);
    companyDto.setCompanyName("test1");
    companyDto.setEmployeeDtoList(this.employeeDtoList);

    EmployeeEntity employeeEntity1 = new EmployeeEntity();
    employeeEntity1.setEmpId(1l);
    employeeEntity1.setEmpname("あああ");
    EmployeeEntity employeeEntity2 = new EmployeeEntity();
    employeeEntity2.setEmpId(2l);
    employeeEntity2.setEmpname("いいい");
    this.employeeEntityList.add(employeeEntity1);
    this.employeeEntityList.add(employeeEntity2);

    companyEntity.setCompanyId(1l);
    companyEntity.setCompanyName("test1");
    companyEntity.setEmployeeEntityList(this.employeeEntityList);
  }

  @Test
  public void exampleControllerTest() throws Exception {

    // モックしたサービスの挙動を設定する
    // ここでは、どんな引数の場合でも上記で定義したクラスを返している
    when(companyDao.searchCompany(anyLong())).thenReturn(this.companyEntity);

    CompanyDto testDto = this.helloService.getCompany();

    assertThat(testDto).isEqualTo(companyDto);
  }
}
