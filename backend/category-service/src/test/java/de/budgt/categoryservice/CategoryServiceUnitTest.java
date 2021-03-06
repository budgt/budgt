package de.budgt.categoryservice;

import static org.mockito.ArgumentMatchers.any;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;

import static org.mockito.Mockito.never;
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

import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;

import de.budgt.categoryservice.exceptions.CategoryNotFoundException;
import de.budgt.categoryservice.exceptions.DuplicateSubcategoryException;
import de.budgt.categoryservice.exceptions.NoAccessToCategoryException;
import de.budgt.categoryservice.models.Category;
import de.budgt.categoryservice.models.Subcategory;
import de.budgt.categoryservice.models.Category.CategoryType;
import de.budgt.categoryservice.repositories.CategoryRepository;
import de.budgt.categoryservice.services.CategoryServiceImpl;

@RunWith(SpringRunner.class)
public class CategoryServiceUnitTest {

  @InjectMocks
  @Spy
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
    List<Subcategory> subcategories = new ArrayList<>();
    subcategories.add(subcategory);

    category.setAmount(1);
    category.setUserId("user");
    category.setSubcategories(subcategories);

    category2 = new Category("ID2", "category2", CategoryType.EXPENSE);
    subcategory2 = new Subcategory("subcategory2", 0);
    subcategory2.setId("ID2");
    List<Subcategory> subcategories2 = new ArrayList<>();
    subcategories2.add(subcategory2);

    category2.setAmount(1);
    category2.setUserId("user2");
    category2.setSubcategories(subcategories2);

  }

  @Test
  @WithMockUser
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
  public void findById_whenOtherUsersID_throwNoAccessToCategoryException() {

    when(repository.findById(any())).thenThrow(new NoAccessToCategoryException("user2"));

    assertThatExceptionOfType(NoAccessToCategoryException.class).isThrownBy(() -> {
      service.findById(category2.getId());
    }).withMessage("No access to category with ID: 'user2'.");

    verify(repository, times(1)).findById(any());
  }

  @Test
  @WithMockUser
  public void findByUserId_thenCategoriesShouldBeFound() {
    List<Category> categories = new ArrayList<Category>();
    categories.add(category);

    when(repository.findByUserId("user")).thenReturn(categories);

    List<Category> found = service.findAll();
    assertThat(found).isEqualTo(categories);

    verify(repository, times(1)).findByUserId("user");
  }

  @Test
  @WithMockUser
  public void findAll_shouldReturnEmptyList_ifNoCategories() {
    List<Category> categories = new ArrayList<Category>();

    when(repository.findByUserId("user")).thenReturn(categories);

    List<Category> found = service.findAll();

    assertThat(found).isEmpty();
    verify(repository, times(1)).findByUserId("user");
  }

  @Test
  @WithMockUser
  public void create_shouldCallInsert_andReturnCreatedCategory() {
    when(repository.insert(category)).thenReturn(category);

    Category created = service.create(category);

    assertThat(created).isEqualTo(category);
    verify(repository, times(1)).insert(category);
  }

  @Test
  @WithMockUser
  public void update_WithoutDupicateSubcategory_shouldCallSave_andReturnUpdateddCategory() {
    subcategory2.setId(null);
    category.getSubcategories().add(subcategory2);

    when(repository.save(category)).thenReturn(category);

    Category updated = service.update(category);

    assertThat(updated).isEqualTo(category);
    verify(repository, times(1)).save(category);
    verify(service, times(1)).setSubcategoryIds(category);
  }

  @Test
  @WithMockUser
  public void update_WithDupicateSubcategory_shouldCallSave_andReturnUpdateddCategory() {
    category.getSubcategories().add(subcategory);

    when(repository.save(category)).thenThrow(new DuplicateSubcategoryException());

    assertThatExceptionOfType(DuplicateSubcategoryException.class).isThrownBy(() -> {
      service.update(category);
    }).withMessage("Subcategory names must be unique within a given category.");

    verify(repository, never()).save(category);
    verify(service, never()).setSubcategoryIds(category);
  }

  @Test
  @WithMockUser
  public void deleteById_withCorrectUserId_shouldCallDeleteById() {
    when(repository.findById(any())).thenReturn(Optional.of(category));

    service.deleteById(category.getId());

    verify(repository, times(1)).deleteById(category.getId());
  }

  @Test
  @WithMockUser
  public void deleteById_withInvalidUserId_shouldCallDeleteById() {
    when(repository.findById(any())).thenReturn(Optional.of(category2));

    assertThatExceptionOfType(NoAccessToCategoryException.class).isThrownBy(() -> {
      service.deleteById(category2.getId());
    }).withMessage("No access to category with ID: 'user2'.");

    verify(repository, times(0)).deleteById(category2.getId());

  }
}
