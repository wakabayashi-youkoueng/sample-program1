package hello.hello.Dao;

import hello.hello.Entity.CompanyEntity;
import hello.hello.Repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CompanyDao {

  @Autowired CompanyRepository companyRepository;

  public CompanyEntity insCompany(CompanyEntity insEntity) {

    CompanyEntity tmp = companyRepository.save(insEntity);

    return tmp;
  }

  public CompanyEntity searchCompany(Long companyId) {
    CompanyEntity tmp = companyRepository.findById(companyId).orElse(new CompanyEntity());
    return tmp;
  }
}
