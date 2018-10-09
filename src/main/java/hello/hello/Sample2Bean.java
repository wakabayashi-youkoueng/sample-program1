package hello.hello;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@SuppressWarnings("serial")
public class Sample2Bean implements Serializable {

  private String id;
  private String timeline;
  private String start;
  private String end;
  private String text;
}
