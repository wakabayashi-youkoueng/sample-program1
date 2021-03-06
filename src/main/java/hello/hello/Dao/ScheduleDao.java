package hello.hello.Dao;

import hello.hello.Entity.ScheduleEntity;
import hello.hello.Repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ScheduleDao {

  @Autowired ScheduleRepository scheduleRepository;

  /**
   * スケジュールを全件検索する処理
   *
   * @return スケジュール全件
   */
  public List<ScheduleEntity> searchAll() {

    List<ScheduleEntity> scheduleEntityList = scheduleRepository.findAll(sortByIdAsc());

    return scheduleEntityList;
  }

  public ScheduleEntity singleInsertOrUpdate(ScheduleEntity prmEntity) {

    return scheduleRepository.save(prmEntity);
  }

  private Sort sortByIdAsc() {
    return new Sort(Sort.Direction.ASC, "id");
  }

  public void delAll() {
    scheduleRepository.deleteAll();
  }

  public List<ScheduleEntity> insList(List<ScheduleEntity> prmList) {

    return scheduleRepository.saveAll(prmList);
  }
}
