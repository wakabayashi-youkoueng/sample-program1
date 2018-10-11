package hello.hello.Service;

import hello.hello.Dao.CompanyDao;
import hello.hello.Dao.ScheduleDao;
import hello.hello.Dto.CompanyDto;
import hello.hello.Dto.EmployeeDto;
import hello.hello.Dto.ScheduleDto;
import hello.hello.Entity.CompanyEntity;
import hello.hello.Entity.EmployeeEntity;
import hello.hello.Entity.ScheduleEntity;
import hello.hello.Util.CommonUtil;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class HelloService {

  @Autowired CompanyDao companyDao;
  @Autowired ScheduleDao scheduleDao;

  public List<ScheduleDto> getSchedule() {

    List<ScheduleEntity> scheduleEntityList = scheduleDao.searchAll();

    List<ScheduleDto> scheduleDtoList = new ArrayList<>();

    scheduleDtoList = CommonUtil.copyListProperties(scheduleEntityList, ScheduleDto.class);

    return scheduleDtoList;
  }

  /**
   * 会社を取得
   *
   * @return CompanyDto
   */
  public CompanyDto getCompany() {

    CompanyEntity companyEntity = companyDao.searchCompany(1L);
    CompanyDto dto = new CompanyDto();
    BeanUtils.copyProperties(companyEntity, dto);
    dto.setEmployeeDtoList(
        CommonUtil.copyListProperties(companyEntity.getEmployeeEntityList(), EmployeeDto.class));

    return dto;
  }

  public List<ScheduleDto> RefreshSchedule() {

  	scheduleDao.delAll();

    List<ScheduleEntity> scheduleEntityList = new ArrayList<>();

    ScheduleEntity entity1 = new ScheduleEntity();
    entity1.setTimeline(0L);
    entity1.setStart(32400L);
    entity1.setEnd(43200L);
    entity1.setText("工程1：400枚");
    ScheduleEntity entity2 = new ScheduleEntity();
    entity2.setTimeline(0L);
    entity2.setStart(54000L);
    entity2.setEnd(57600L);
    entity2.setText("工程1：200枚");
    ScheduleEntity entity3 = new ScheduleEntity();
    entity3.setTimeline(1L);
    entity3.setStart(57600L);
    entity3.setEnd(61200L);
    entity3.setText("工程2：100枚");

    scheduleEntityList.add(entity1);
    scheduleEntityList.add(entity2);
    scheduleEntityList.add(entity3);

    List<ScheduleEntity> resultList = scheduleDao.insList(scheduleEntityList);

    return CommonUtil.copyListProperties(resultList, ScheduleDto.class);
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
