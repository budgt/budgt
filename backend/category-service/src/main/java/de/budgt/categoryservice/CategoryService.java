package de.budgt.categoryservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class CategoryService {

  public static void main(String[] args) {
    SpringApplication.run(CategoryService.class, args);
  }

}
