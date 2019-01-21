package de.budgt.categoryservice.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import de.budgt.categoryservice.model.Category;

/**
 * CategoryRepository
 */

public interface CategoryRepository extends MongoRepository<Category, String> {

    public Category findByName(String name);

    public List<Category> findAll();

}