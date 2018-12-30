import { Injectable } from '@angular/core';
import { Subcategory } from '../models/subcategory';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { CategoryService } from './category.service';

@Injectable()
export class SubcategoryService {
  constructor(private categoryService: CategoryService) {}

  createSubcategory(category: Category, subcategory: Subcategory): Observable<Category> {
    category.subcategories.push(subcategory);

    return this.categoryService.updateCategory(category);
  }

  updateSubcategory(category: Category, subcategory: Subcategory): Observable<Category> {
    let updateIndex = category.subcategories.findIndex(subcategoryOld => subcategoryOld.id === subcategory.id);
    category.subcategories[updateIndex] = subcategory;

    return this.categoryService.updateCategory(category);
  }
}
