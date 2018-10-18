package hello.hello.Dao.secondary;

import hello.hello.Entity.secondary.Book;
import hello.hello.Repository.secondary.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class BookDao {

  @Autowired BookRepository bookRepository;

  public List<Book> searchAll() {

    List<Book> bookList = bookRepository.findAll();

    return bookList;
  }

  public List<Book> InsOrUpdBook(List<Book> prmBookList) {

    bookRepository.deleteAll();
    return bookRepository.saveAll(prmBookList);
  }
}
