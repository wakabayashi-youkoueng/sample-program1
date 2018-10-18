package hello.hello.Service;

import hello.hello.Dao.primary.ScheduleDao;
import hello.hello.Dao.secondary.BookDao;
import hello.hello.Dto.ScheduleDto;
import hello.hello.Entity.primary.ScheduleEntity;
import hello.hello.Entity.secondary.Book;
import hello.hello.Util.CommonUtil;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class HelloService {

  @Autowired ScheduleDao scheduleDao;

  @Autowired BookDao bookDao;

  public List<ScheduleDto> getSchedule() {

    List<ScheduleEntity> scheduleEntityList = scheduleDao.searchAll();

    List<ScheduleDto> scheduleDtoList = new ArrayList<>();

    scheduleDtoList = CommonUtil.copyListProperties(scheduleEntityList, ScheduleDto.class);

    return scheduleDtoList;
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

  public List<Book> RefreshBook() {

    Book book1 = new Book();
    Book book2 = new Book();

    book1.setIsbn("1234");
    book1.setTitle("書籍１");

    book2.setIsbn("5678");
    book2.setTitle("書籍２");

    List<Book> bookList = new ArrayList<>();
    bookList.add(book1);
    bookList.add(book2);

    List<Book> resultList = bookDao.InsOrUpdBook(bookList);

    return resultList;
  }

  public ScheduleDto SingleInsOrUpdSchedule(ScheduleDto prmDto) {

    ScheduleEntity scheduleEntity = new ScheduleEntity();

    BeanUtils.copyProperties(prmDto, scheduleEntity);

    ScheduleEntity resultEntity = scheduleDao.singleInsertOrUpdate(scheduleEntity);

    ScheduleDto resultDto = new ScheduleDto();

    BeanUtils.copyProperties(resultEntity, resultDto);

    return resultDto;
  }
}
