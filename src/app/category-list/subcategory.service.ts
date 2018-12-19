import { Injectable } from '@angular/core';
import { Subcategory } from '../models/subcategory';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { CategoryService } from './category.service';

@Injectable()
export class SubcategoryService {

  constructor(
    private categoryService: CategoryService
  ) { }


  createSubcategory(category: Category, subcategory: Subcategory): Observable<Category> {
    category.subcategories.set(category.nextSubcategoryId, subcategory);
    category.nextSubcategoryId++;
    return this.categoryService.updateCategory(category);
  }

  updateSubcategory(category: Category, subcategory: Subcategory): Observable<Category> {
    category.subcategories.set(subcategory.id, subcategory);
    return this.categoryService.updateCategory(category);
  }

}
