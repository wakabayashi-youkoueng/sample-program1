package hello.hello.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/sbadmin2/")
public class SbAdmin2Controller {

  @RequestMapping("/blank")
  public ModelAndView blank() {
    return new ModelAndView("SbAdmin2Controller/blank");
  }
}
