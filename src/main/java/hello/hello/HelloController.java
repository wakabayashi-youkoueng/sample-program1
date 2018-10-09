package hello.hello;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
@EnableAutoConfiguration
public class HelloController {

	/**
	 * home画面を表示
	 * （無くてもindex.htmlを起動するが、明示的に表示している）
	 * @param model model
	 * @return index.html
	 */
	@GetMapping("/")
	public String home(Model model) {
		model.addAttribute("message", "Hello!!");
		return "index";
	}

	/**
	 * hello画面を表示
	 * @param model
	 * @return hello.html
	 */
  @RequestMapping("/hello")
  public String hello(Model model) {
    model.addAttribute("message", "Hello!!");
    return "hello";
  }

	/**
	 * リストを返す処理
	 * @param beanList 画面から渡される引数
	 * @return
	 */
  @RequestMapping(value="/service", consumes=MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public List<String> top(@RequestBody List<Sample2Bean> beanList) {

    // @ResponseBody は JSONを返すという宣言

    List<String> strList = new ArrayList<String>();

    for (Sample2Bean tmpBean : beanList) {
	    strList.add(tmpBean.getId() + "：" + tmpBean.getStart() + "～" + tmpBean.getEnd());
    }


    return strList;
  }
}
