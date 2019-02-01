package de.budgt.categoryservice.services;

import java.util.List;

import de.budgt.categoryservice.models.Category;

/**
 * CategoryService
 */
public interface CategoryService {

  public Category findById(String id);

  public List<Category> findAll();

  public void deleteById(String id);

}
