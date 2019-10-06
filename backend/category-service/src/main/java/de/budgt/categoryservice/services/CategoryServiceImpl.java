package de.budgt.categoryservice.services;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.context.annotation.Primary;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import de.budgt.categoryservice.exceptions.CategoryNotFoundException;
import de.budgt.categoryservice.exceptions.DuplicateSubcategoryException;
import de.budgt.categoryservice.exceptions.NoAccessToCategoryException;
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
    Category category = categoryRepository.findById(id).orElseThrow(() -> new CategoryNotFoundException(id));
    if (getCurrentUserId().equals(category.getUserId())) {
      return category;
    } else {
      throw (new NoAccessToCategoryException(id));
    }
  }

  @Override
  public List<Category> findAll() {
    return categoryRepository.findByUserId(getCurrentUserId());
  }

  @Override
  public Category create(Category category) {
    category.setUserId(getCurrentUserId());

    return categoryRepository.insert(category);
  }

  @Override
  public Category update(Category category) {
    if (getCurrentUserId().equals(category.getUserId())) {

      if (category.checkForSubcategoryDuplicate()) {
        throw new DuplicateSubcategoryException();
      } else {
        // generate IDs for new Subcategories
        category = setSubcategoryIds(category);

        return categoryRepository.save(category);
      }
    } else {
      throw (new NoAccessToCategoryException(category.getUserId()));
    }
  }

  @Override
  public void deleteById(String id) {
    Category categoryToDelete = categoryRepository.findById(id).orElseThrow(() -> new CategoryNotFoundException(id));

    if (getCurrentUserId().equals(categoryToDelete.getUserId())) {
      categoryRepository.deleteById(id);
    } else {
      throw (new NoAccessToCategoryException(categoryToDelete.getUserId()));
    }
  }

  public Category setSubcategoryIds(Category category) {
    category.getSubcategories().forEach(subcategory -> {
      if (subcategory != null && subcategory.getId() == null) {
        subcategory.setId(new ObjectId().toHexString());
      }
    });
    return category;
  }

  private String getCurrentUserId() {
    String currentUserId = "";

    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (!(authentication instanceof AnonymousAuthenticationToken)) {
      currentUserId = authentication.getName();
    }

    return currentUserId;

  }

}
