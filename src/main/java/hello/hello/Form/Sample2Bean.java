package hello.hello.Form;

import lombok.Data;

import java.io.Serializable;

@Data
@SuppressWarnings("serial")
public class Sample2Bean implements Serializable {

  private String id;
  private String timeline;
  private String start;
  private String end;
  private String text;
}
