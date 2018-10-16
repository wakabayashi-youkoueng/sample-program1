package hello.hello.Form;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Data
public class SampleBean implements Serializable {

  @NotBlank private String name;
  private String aaa;
  private String bbb;
  private String ccc;
}
