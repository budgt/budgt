package de.budgt.categoryservice;

import static org.mockito.ArgumentMatchers.any;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.assertj.core.api.Assertions.*;

import org.springframework.test.context.junit4.SpringRunner;

import de.budgt.categoryservice.exceptions.CategoryNotFoundException;
import de.budgt.categoryservice.models.Category;
import de.budgt.categoryservice.models.Subcategory;
import de.budgt.categoryservice.models.Category.CategoryType;
import de.budgt.categoryservice.repositories.CategoryRepository;
import de.budgt.categoryservice.services.CategoryServiceImpl;

@RunWith(SpringRunner.class)
public class CategoryServiceUnitTest {

  @InjectMocks
  private CategoryServiceImpl service;

  @Mock
  private static CategoryRepository repository;

  Category category;
  Category category2;
  Subcategory subcategory;
  Subcategory subcategory2;

  @Before
  public void setUp() throws Exception {

    category = new Category("ID", "category", CategoryType.INCOME);
    subcategory = new Subcategory("subcategory", 999);
    subcategory.setId("ID");
    Subcategory[] subcategories = new Subcategory[1];
    subcategories[0] = subcategory;

    category.setAmount(1);
    category.setSubcategories(subcategories);

    category2 = new Category("ID2", "category2", CategoryType.EXPENSE);
    subcategory = new Subcategory("subcategory2", 0);
    subcategory.setId("ID2");
    Subcategory[] subcategories2 = new Subcategory[1];
    subcategories2[0] = subcategory2;

    category2.setAmount(1);
    category2.setSubcategories(subcategories2);

  }

  @Test
  public void findById_whenValidID_thenCategoryShouldBeFound() {

    when(repository.findById(any())).thenReturn(Optional.of(category));

    Category found = service.findById(category.getId());
    assertThat(found).isEqualTo(category);

    verify(repository, times(1)).findById(category.getId());
  }

  @Test
  public void findById_whenInvalidID_throwCategoryNotFoundException() {

    when(repository.findById(any())).thenThrow(new CategoryNotFoundException("ID"));

    assertThatExceptionOfType(CategoryNotFoundException.class).isThrownBy(() -> {
      service.findById(category.getId());
    }).withMessage("could not find category with ID: 'ID'.");

    verify(repository, times(1)).findById(any());
  }

  @Test
  public void findAll_thenCategoriesShouldBeFound() {
    List<Category> categories = new ArrayList<Category>();
    categories.add(category);
    categories.add(category2);

    when(repository.findAll()).thenReturn(categories);

    List<Category> found = service.findAll();
    assertThat(found).isEqualTo(categories);

    verify(repository, times(1)).findAll();
  }

  @Test
  public void findAll_shouldReturnEmptyList_ifNoCategories() {
    List<Category> categories = new ArrayList<Category>();

    when(repository.findAll()).thenReturn(categories);

    List<Category> found = service.findAll();

    assertThat(found).isEmpty();
    verify(repository, times(1)).findAll();
  }

  @Test
  public void create_shouldCallInsert_andReturnCreatedCategory() {
    when(repository.insert(category)).thenReturn(category);

    Category created = service.create(category);

    assertThat(created).isEqualTo(category);
    verify(repository, times(1)).insert(category);
  }

  @Test
  public void update_shouldCallSave_andReturnUpdateddCategory() {
    when(repository.save(category)).thenReturn(category);

    Category updated = service.update(category);

    assertThat(updated).isEqualTo(category);
    verify(repository, times(1)).save(category);
  }

  @Test
  public void deleteById_shouldCallDeleteById() {
    service.deleteById(category.getId());

    verify(repository, times(1)).deleteById(category.getId());
  }
}
