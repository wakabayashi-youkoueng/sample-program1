package hello.hello.Util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.experimental.UtilityClass;
import org.springframework.beans.BeanUtils;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;

@UtilityClass
public class CommonUtil {

  /**
   * リストを別の指定クラス型リストにコピーする処理
   *
   * @param in
   * @param type
   * @param <T>
   * @param <U>
   * @return
   */
  public <T, U> List<U> copyListProperties(List<T> in, Class<U> type) {
    List<U> out = new ArrayList<>();
    try {
      for (T t : in) {
        U u = type.getDeclaredConstructor().newInstance();
        BeanUtils.copyProperties(t, u);
        out.add(u);
      }
    } catch (IllegalAccessException e) {
      e.printStackTrace();
    } catch (InstantiationException e) {
      e.printStackTrace();
    } catch (NoSuchMethodException e) {
      e.printStackTrace();
    } catch (InvocationTargetException e) {
      e.printStackTrace();
    }

    return out;
  }

  /**
   * DTOクラスのインスタンスをJSON文字列に変換する
   *
   * @param dto Json変換対象のDtoオブジェクト
   * @return String Json
   * @throws JsonProcessingException Json変換できないときのエラー
   */
  public static String dto2Json(Object dto) {

    ObjectMapper mapper = new ObjectMapper();

    try {
      String json = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(dto);
      return json;
    } catch (JsonProcessingException e) {
      return null;
    }
  }
}
