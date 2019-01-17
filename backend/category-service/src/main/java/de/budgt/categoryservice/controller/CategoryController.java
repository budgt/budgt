package de.budgt.categoryservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import de.budgt.categoryservice.model.Category;
import de.budgt.categoryservice.repository.CategoryRepository;

/**
 * CategoryController
 */

@RestController
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @RequestMapping("/category")
    public Category category(@RequestParam(value = "name", defaultValue = "default") String name) {
        Category category = categoryRepository.findByName(name);
        System.out.println(category);
        return category;
    }

    @RequestMapping("/categories")
    public List<Category> categories() {
        List<Category> categories = categoryRepository.findAll();
        System.out.println(categories);
        return categories;
    }
}
