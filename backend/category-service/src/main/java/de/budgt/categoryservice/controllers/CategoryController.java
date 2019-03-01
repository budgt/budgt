package de.budgt.categoryservice.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import de.budgt.categoryservice.exceptions.CategoryNotFoundException;
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
  public ResponseEntity<Category> getCategoryById(@PathVariable(value = "id") String id) {
    try {
      return new ResponseEntity<Category>(categoryService.findById(id), HttpStatus.OK);
    } catch (CategoryNotFoundException ex) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage());
    }
  }

  @GetMapping("/categories")
  public ResponseEntity<List<Category>> getAllCategories() {
    return new ResponseEntity<List<Category>>(categoryService.findAll(), HttpStatus.OK);
  }

  @PostMapping("/categories")
  public ResponseEntity<Category> createCategory(@RequestBody Category category) {
    category = categoryService.create(category);
    return new ResponseEntity<Category>(category, HttpStatus.OK);
  }

  @PutMapping("/categories")
  public ResponseEntity<Category> updateCategory(@RequestBody Category category) {
    category = categoryService.update(category);
    return new ResponseEntity<Category>(category, HttpStatus.OK);
  }

  @DeleteMapping("/categories/{id}")
  public ResponseEntity<String> deleteCategorie(@PathVariable(value = "id") String id) {
    categoryService.deleteById(id);
    return new ResponseEntity<String>(HttpStatus.NO_CONTENT);
  }
}
