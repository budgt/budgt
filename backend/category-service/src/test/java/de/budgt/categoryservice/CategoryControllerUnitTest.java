package de.budgt.categoryservice;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import java.util.Arrays;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertEquals;

import de.budgt.categoryservice.controllers.CategoryController;
import de.budgt.categoryservice.exceptions.CategoryNotFoundException;
import de.budgt.categoryservice.models.Category;
import de.budgt.categoryservice.models.Subcategory;
import de.budgt.categoryservice.models.Category.CategoryType;
import de.budgt.categoryservice.services.CategoryService;

import static org.mockito.BDDMockito.*;

@RunWith(MockitoJUnitRunner.class)
@WebMvcTest(CategoryController.class)
public class CategoryControllerUnitTest {

  @Autowired
  private MockMvc mvc;

  @Autowired
  private ObjectMapper objectMapper;

  @Mock
  private CategoryService service;

  @InjectMocks
  private CategoryController categoryController;

  Category category;
  Category category2;
  Subcategory subcategory;

  @Before
  public void setUp() throws Exception {
    MockitoAnnotations.initMocks(this);
    mvc = MockMvcBuilders.standaloneSetup(categoryController).build();
    objectMapper = new ObjectMapper();

    category = new Category("ID", "category", CategoryType.INCOME);
    category2 = new Category("ID2", "category2", CategoryType.EXPENSE);
    subcategory = new Subcategory("subcategory", 999);
    subcategory.setId("ID");
    Subcategory[] subcategories = new Subcategory[1];
    subcategories[0] = subcategory;

    category.setAmount(1);
    category.setSubcategories(subcategories);
  }

  @Test
  public void findAll_CategoriesFound_ShouldReturnFoundCategoryEntries() throws Exception {

    when(service.findAll()).thenReturn(Arrays.asList(category, category2));

    mvc.perform(get("/categories")) //
        .andExpect(status().isOk()) //
        .andExpect(jsonPath("$", hasSize(2))) //
        .andExpect(jsonPath("$[0].id", is(category.getId()))) //
        .andExpect(jsonPath("$[0].name", is(category.getName())))
        .andExpect(jsonPath("$[0].type", is(category.getType().toString())))
        .andExpect(jsonPath("$[0].amount", is(category.getAmount())))
        .andExpect(jsonPath("$[0].subcategories[0].id", is(subcategory.getId())))
        .andExpect(jsonPath("$[0].subcategories[0].name", is(subcategory.getName())))
        .andExpect(jsonPath("$[0].subcategories[0].amount", is(subcategory.getAmount())))
        .andExpect(jsonPath("$[1].id", is(category2.getId()))) //
        .andExpect(jsonPath("$[1].name", is(category2.getName())))
        .andExpect(jsonPath("$[1].type", is(category2.getType().toString())));

    verify(service, times(1)).findAll();
  }

  @Test
  public void findByID_CategoriesFound_ShouldReturnFoundCategoryEntries() throws Exception {

    when(service.findById(category.getId())).thenReturn(category);

    mvc.perform(get("/categories/" + category.getId())) //
        .andExpect(status().isOk()) //
        .andExpect(jsonPath("$.id", is(category.getId()))) //
        .andExpect(jsonPath("$.name", is(category.getName())))
        .andExpect(jsonPath("$.type", is(category.getType().toString())))
        .andExpect(jsonPath("$.amount", is(category.getAmount())))
        .andExpect(jsonPath("$.subcategories[0].id", is(subcategory.getId())))
        .andExpect(jsonPath("$.subcategories[0].name", is(subcategory.getName())))
        .andExpect(jsonPath("$.subcategories[0].amount", is(subcategory.getAmount())));

    verify(service, times(1)).findById(category.getId());
  }

  @Test
  public void findById_CategoryNotFound_ShouldReturnError404WithBody() throws Exception {
    String notId = "NotAnID";

    when(service.findById(notId)).thenThrow(new CategoryNotFoundException(notId));

    mvc.perform(get("/categories/" + notId)) //
        .andExpect(status().isNotFound()) //
        .andExpect(status().reason("could not find category with ID: 'NotAnID'.")) //
        .andDo(MockMvcResultHandlers.print());
    verify(service, times(1)).findById(notId);
  }

  @Test
  public void createCategory_ShouldReturnCreatedCategory() throws Exception {
    ArgumentCaptor<Category> argument = ArgumentCaptor.forClass(Category.class);

    when(service.create(any())).thenReturn(category);

    mvc.perform(
        post("/categories").contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(category)))
        .andExpect(status().isOk()) //
        .andExpect(jsonPath("$.id", is(category.getId()))) //
        .andExpect(jsonPath("$.name", is(category.getName())))
        .andExpect(jsonPath("$.type", is(category.getType().toString())))
        .andExpect(jsonPath("$.amount", is(category.getAmount())))
        .andExpect(jsonPath("$.subcategories[0].id", is(subcategory.getId())))
        .andExpect(jsonPath("$.subcategories[0].name", is(subcategory.getName())))
        .andExpect(jsonPath("$.subcategories[0].amount", is(subcategory.getAmount())));

    verify(service, times(1)).create(argument.capture());

    assertEquals(category.toString(), argument.getValue().toString());

  }

  @Test
  public void updateCategory_ShouldReturnUpdatedCategory() throws Exception {
    ArgumentCaptor<Category> argument = ArgumentCaptor.forClass(Category.class);

    when(service.update(any())).thenReturn(category);

    mvc.perform(put("/categories/" + category.getId()).contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(category))).andExpect(status().isOk()) //
        .andExpect(jsonPath("$.id", is(category.getId()))) //
        .andExpect(jsonPath("$.name", is(category.getName())))
        .andExpect(jsonPath("$.type", is(category.getType().toString())))
        .andExpect(jsonPath("$.amount", is(category.getAmount())))
        .andExpect(jsonPath("$.subcategories[0].id", is(subcategory.getId())))
        .andExpect(jsonPath("$.subcategories[0].name", is(subcategory.getName())))
        .andExpect(jsonPath("$.subcategories[0].amount", is(subcategory.getAmount())));

    verify(service, times(1)).update(argument.capture());

    assertEquals(category.toString(), argument.getValue().toString());

  }

  @Test
  public void deleteByID_forExisting_ShouldReturnNoContent() throws Exception {

    mvc.perform(delete("/categories/" + category.getId())) //
        .andExpect(status().isNoContent()) //
        .andExpect(jsonPath("$").doesNotHaveJsonPath());

    verify(service, times(1)).deleteById(category.getId());
  }
}
