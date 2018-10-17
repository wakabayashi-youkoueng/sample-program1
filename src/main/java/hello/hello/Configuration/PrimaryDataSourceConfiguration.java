package hello.hello.Configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.Database;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;

import javax.sql.DataSource;

@Configuration
@EnableJpaRepositories(
    basePackages = "hello.hello.Repository.primary",
    entityManagerFactoryRef = "primaryEntityManager",
    transactionManagerRef = "primaryTransactionManager")
public class PrimaryDataSourceConfiguration {

  @Bean
  @Primary
  @ConfigurationProperties(prefix = "spring.datasource.primary")
  public DataSourceProperties primaryProperties() {
    return new DataSourceProperties();
  }

  @Bean
  @Primary
  @Autowired
  public DataSource primaryDataSource(
      @Qualifier("primaryProperties") DataSourceProperties properties) {
    return properties.initializeDataSourceBuilder().build();
  }

  @Bean
  @Primary
  @Autowired
  public LocalContainerEntityManagerFactoryBean primaryEntityManager(
      EntityManagerFactoryBuilder builder, @Qualifier("primaryDataSource") DataSource dataSource) {

    LocalContainerEntityManagerFactoryBean bean =
        builder
            .dataSource(dataSource)
            .packages("hello.hello.Entity.primary")
            .persistenceUnit("primary")
            .build();

    // VendorAdapterの設定
    HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
    vendorAdapter.setDatabasePlatform("org.hibernate.dialect.MySQL5InnoDBDialect");
    vendorAdapter.setDatabase(Database.MYSQL);
    vendorAdapter.setShowSql(true);
    vendorAdapter.setGenerateDdl(true);

    bean.setJpaVendorAdapter(vendorAdapter);

    return bean;
  }

  @Bean
  @Primary
  @Autowired
  public JpaTransactionManager primaryTransactionManager(
      @Qualifier("primaryEntityManager")
          LocalContainerEntityManagerFactoryBean primaryEntityManager) {

    JpaTransactionManager transactionManager = new JpaTransactionManager();
    transactionManager.setEntityManagerFactory(primaryEntityManager.getObject());
    return transactionManager;
  }
}
