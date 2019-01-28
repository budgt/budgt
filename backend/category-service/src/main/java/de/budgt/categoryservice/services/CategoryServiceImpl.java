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
    public Category findByName(String name) {
        return categoryRepository.findByName(name);
    }

    @Override
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

}