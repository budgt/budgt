package de.budgt.categoryservice.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import de.budgt.categoryservice.models.Category;
import de.budgt.categoryservice.services.CategoryService;

/**
 * CategoryController
 */
@RestController
public class CategoryController {

  @Autowired
  private CategoryService categoryService;

  @RequestMapping("/categories/{name}")
  public Category category(@PathVariable(value = "name") String name) {
    Category category = categoryService.findByName(name);
    System.out.println(category);
    return category;
  }

  @RequestMapping("/categories")
  public List<Category> categories() {
    List<Category> categories = categoryService.findAll();
    System.out.println(categories);
    return categories;
  }
}
