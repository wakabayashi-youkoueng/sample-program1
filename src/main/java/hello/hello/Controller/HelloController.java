package hello.hello.Controller;

import hello.hello.Dto.CompanyDto;
import hello.hello.Entity.CompanyEntity;
import hello.hello.Form.Sample2Bean;
import hello.hello.Service.HelloService;
import hello.hello.Util.CommonUtil;
import org.springframework.beans.factory.annotation.Autowired;
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

  @Autowired private HelloService helloService;

  /**
   * home画面を表示 （無くてもindex.htmlを起動するが、明示的に表示している）
   *
   * @param model model
   * @return index.html
   */
  @GetMapping("/")
  public String home(Model model) {
    return "index";
  }

  /**
   * index画面を表示
   *
   * @return index.html
   */
  @PostMapping("/index")
  public String index() {
    return "index";
  }

  /**
   * Dashboard画面を表示
   *
   * @return dashboard.html
   */
  @PostMapping("/dashboard")
  public String dashboard() {
    return "/dashboard";
  }

  /**
   * Table画面を表示
   *
   * @return tablePage.html
   */
  @PostMapping("/tablePage")
  public String tablePage() {
    return "/tablePage";
  }

  /**
   * リストを返す処理
   *
   * @param beanList 画面から渡される引数
   * @return json
   */
  @RequestMapping(value = "/service", consumes = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public List<String> service(@RequestBody List<Sample2Bean> beanList) {

    // @ResponseBody は JSONを返すという宣言

    List<String> strList = new ArrayList<>();

    for (Sample2Bean tmpBean : beanList) {
      strList.add(tmpBean.getId() + "：" + tmpBean.getStart() + "～" + tmpBean.getEnd());
    }
    return strList;
  }

  /**
   * 会社・社員リストを取得する処理
   *
   * @return 会社
   */
  @RequestMapping("/company")
  @ResponseBody
  public String company() {

    CompanyDto dto = helloService.getCompany();

    String json = CommonUtil.dto2Json(dto);

    return json;
  }

  @RequestMapping("/insCompany")
  @ResponseBody
  public String insCompany() {

    CompanyEntity companyEntity = helloService.insCompany();

    String json = CommonUtil.dto2Json(companyEntity);

    return json;
  }
}
