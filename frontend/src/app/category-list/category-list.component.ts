import { Subcategory } from '../models/subcategory';
import { Category } from '../models/category';
import { CategoryService } from './category.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy {
  categorySubscription: Subscription;

  constructor(public categoryService: CategoryService) {}

  ngOnInit() {
    this.categorySubscription = this.categoryService.getCategories().subscribe(categories => {
      this.categoryService.categories = categories;
    });
  }

  selectCategory(category: Category) {
    category === this.categoryService.selectedCategory
      ? (this.categoryService.selectedCategory = null)
      : (this.categoryService.selectedCategory = category);
  }

  deleteCategory(category: Category) {
    let index: number = this.categoryService.categories.indexOf(category);
    this.categoryService.categories.splice(index, 1);

    this.categoryService.deleteCatgory(category).subscribe();
  }

  deleteSubcategory(subcategory: Subcategory) {
    let index: number = this.categoryService.selectedCategory.subcategories.indexOf(subcategory);
    this.categoryService.selectedCategory.subcategories.splice(index, 1);

    this.categoryService.updateCategory(this.categoryService.selectedCategory).subscribe();
  }

  ngOnDestroy() {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
  }
}
