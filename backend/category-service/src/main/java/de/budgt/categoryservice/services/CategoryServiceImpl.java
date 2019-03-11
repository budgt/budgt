package de.budgt.categoryservice.services;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import de.budgt.categoryservice.exceptions.CategoryNotFoundException;
import de.budgt.categoryservice.exceptions.DuplicateSubcategoryException;
import de.budgt.categoryservice.models.Category;
import de.budgt.categoryservice.repositories.CategoryRepository;

/**
 * CategoryServiceImpl
 */
@Service
@Primary
public class CategoryServiceImpl implements CategoryService {

  private final CategoryRepository categoryRepository;

  public CategoryServiceImpl(CategoryRepository categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  @Override
  public Category findById(String id) {
    return categoryRepository.findById(id).orElseThrow(() -> new CategoryNotFoundException(id));
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

    if (category.checkForSubcategoryDuplicate()) {
      throw new DuplicateSubcategoryException();
    } else {
      // generate IDs for new Subcategories
      category = setSubcategoryIds(category);

      return categoryRepository.save(category);
    }
  }

  @Override
  public void deleteById(String id) {
    categoryRepository.deleteById(id);
  }

  public Category setSubcategoryIds(Category category) {
    category.getSubcategories().forEach(subcategory -> {
      if (subcategory != null && subcategory.getId() == null) {
        subcategory.setId(new ObjectId().toHexString());
      }
    });
    return category;
  }

}