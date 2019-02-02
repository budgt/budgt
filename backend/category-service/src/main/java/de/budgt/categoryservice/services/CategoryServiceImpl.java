package de.budgt.categoryservice.services;

import java.util.List;

import org.springframework.stereotype.Service;

import de.budgt.categoryservice.models.Category;
import de.budgt.categoryservice.repositories.CategoryRepository;

/**
 * CategoryServiceImpl
 */
@Service
public class CategoryServiceImpl implements CategoryService {

  private final CategoryRepository categoryRepository;

  private CategoryServiceImpl(CategoryRepository categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  @Override
  public Category findById(String id) {
    return categoryRepository.findByid(id);
  }

  @Override
  public List<Category> findAll() {
    return categoryRepository.findAll();
  }

  @Override
  public Category create(Category category) {
    return categoryRepository.insert(category);
  }

  @Override
  public Category update(Category category) {
    return categoryRepository.save(category);
  }

  @Override
  public void deleteById(String id) {
    categoryRepository.deleteById(id);
  }
}
