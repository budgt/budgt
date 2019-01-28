package de.budgt.categoryservice.services;

import java.util.List;

import de.budgt.categoryservice.models.Category;

/**
 * CategoryService
 */
public interface CategoryService {

    public Category findByName(String name);

    public List<Category> findAll();

}
