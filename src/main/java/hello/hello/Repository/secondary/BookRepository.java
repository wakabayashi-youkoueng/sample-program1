package hello.hello.Repository.secondary;

import hello.hello.Entity.secondary.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, String> {}
