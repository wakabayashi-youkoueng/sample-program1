package hello.hello.Entity.secondary;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Book {

  @Id
  //  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "bookId")
  private int id;

  private String isbn;
  private String title;
}
