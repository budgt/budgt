package de.budgt.categoryservice.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

  @GetMapping("/categories/{id}")
  public Category getCategoryById(@PathVariable(value = "id") String id) {
    Category category = categoryService.findById(id);
    return category;
  }

  @GetMapping("/categories")
  public List<Category> getAllCategories() {
    List<Category> categories = categoryService.findAll();
    return categories;
  }

  @DeleteMapping("/categories/{id}")
  public ResponseEntity<String> deleteCategorie(@PathVariable(value = "id") String id) {
    categoryService.deleteById(id);
    return new ResponseEntity<String>(HttpStatus.NO_CONTENT);
  }
}
