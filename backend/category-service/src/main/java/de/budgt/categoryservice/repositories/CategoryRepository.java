package de.budgt.categoryservice.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import de.budgt.categoryservice.models.Category;

/**
 * CategoryRepository
 */

public interface CategoryRepository extends MongoRepository<Category, String> {

  public Category findByid(String id);

  public List<Category> findAll();

}
