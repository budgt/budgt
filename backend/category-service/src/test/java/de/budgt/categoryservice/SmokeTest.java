package de.budgt.categoryservice;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import de.budgt.categoryservice.controllers.CategoryController;

@RunWith(SpringRunner.class)
@SpringBootTest
@Ignore
public class SmokeTest {

  @Autowired
  private CategoryController controller;

  @Test
  public void contexLoads() throws Exception {
    assertThat(controller).isNotNull();
  }
}
