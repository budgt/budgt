package de.budgt.categoryservice;

import static org.assertj.core.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringRunner;

import de.budgt.categoryservice.models.Category;
import de.budgt.categoryservice.models.Subcategory;
import de.budgt.categoryservice.models.Category.CategoryType;

@RunWith(SpringRunner.class)
public class CategoryUnitTest {

  Category category;
  Subcategory subcategory;

  @Before
  public void setUp() throws Exception {

    category = new Category("ID", "category", CategoryType.INCOME);
    subcategory = new Subcategory("subcategory", 999);
    subcategory.setId("ID");
    List<Subcategory> subcategories = new ArrayList<>();
    subcategories.add(subcategory);

    category.setAmount(1);
    category.setSubcategories(subcategories);
  }

  @Test
  public void checkForSubcategoryDuplicate_withoutDuplicate_shouldReturnTrue() {

    assertThat(category.checkForSubcategoryDuplicate()).isEqualTo(false);
  }

  @Test
  public void checkForSubcategoryDuplicate_withDuplicate_shouldReturnFalse() {
    category.getSubcategories().add(subcategory);

    assertThat(category.checkForSubcategoryDuplicate()).isEqualTo(true);
  }

}
