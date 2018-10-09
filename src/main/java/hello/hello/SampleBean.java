package hello.hello;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@SuppressWarnings("serial")
public class SampleBean implements Serializable {

  private String name;
  private String aaa;
	private String bbb;
	private String ccc;
}
