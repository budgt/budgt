package de.budgt.categoryservice;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import java.util.Arrays;

import org.bson.types.ObjectId;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.hamcrest.core.Is.is;

import de.budgt.categoryservice.controllers.CategoryController;
import de.budgt.categoryservice.models.Category;
import de.budgt.categoryservice.models.Category.CategoryType;
import de.budgt.categoryservice.services.CategoryService;

import static org.mockito.BDDMockito.*;

@RunWith(MockitoJUnitRunner.class)
@WebMvcTest(CategoryController.class)
public class CategoryControllerTest {

  @Autowired
  private MockMvc mvc;

  @Mock
  private CategoryService service;

  @InjectMocks
  private CategoryController categoryController;

  @Before
  public void setUp() throws Exception {
    MockitoAnnotations.initMocks(this);
    mvc = MockMvcBuilders.standaloneSetup(categoryController).build();
  }

  @Test
  public void findAll_CategoriesFound_ShouldReturnFoundCategoryEntries() throws Exception {
    String firstID = new ObjectId().toHexString();
    Category first = new Category(firstID, "first", CategoryType.INCOME);

    String secondID = new ObjectId().toHexString();
    Category second = new Category(secondID, "second", CategoryType.EXPENSE);

    given(service.findAll()).willReturn(Arrays.asList(first, second));

    mvc.perform(get("/categories")).andExpect(status().isOk()).andExpect(jsonPath("$", hasSize(2)))
        .andExpect(jsonPath("$[0].id", is(first.getId()))).andExpect(jsonPath("$[0].name", is(first.getName())))
        .andExpect(jsonPath("$[0].type", is(first.getType().toString())))
        .andExpect(jsonPath("$[1].id", is(second.getId()))).andExpect(jsonPath("$[1].name", is(second.getName())))
        .andExpect(jsonPath("$[1].type", is(second.getType().toString())));

    verify(service, times(1)).findAll();
  }

  @Test
  public void findByName_CategoriesFound_ShouldReturnFoundCategoryEntries() throws Exception {
    String firstID = new ObjectId().toHexString();
    Category first = new Category(firstID, "first", CategoryType.INCOME);

    given(service.findByName("first")).willReturn(first);

    mvc.perform(get("/categories/first")).andExpect(status().isOk())
        .andExpect(jsonPath("$.id", is(first.getId().toString()))).andExpect(jsonPath("$.name", is(first.getName())))
        .andExpect(jsonPath("$.type", is(first.getType().toString())));

    verify(service, times(1)).findByName(first.getName());
  }
}
