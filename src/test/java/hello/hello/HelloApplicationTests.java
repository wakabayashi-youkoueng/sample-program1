package hello.hello;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class HelloApplicationTests {

  @Test
  public void exampleControllerTest() throws Exception {

    // モックしたサービスの挙動を設定する
    // ここでは、どんな引数の場合でも上記で定義したクラスを返している

  }
}
