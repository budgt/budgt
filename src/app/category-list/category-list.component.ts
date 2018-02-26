import { Subcategory } from './../../models/subcategory';
import { Category } from './../../models/category';
import { CategoryService } from './category.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})

export class CategoryListComponent implements OnDestroy {
  categories: Category[];
  selectedCategory: Category;
  categorySubscription: Subscription;

  constructor(private categoryService: CategoryService) {
    this.categorySubscription = this.categoryService.getAllCategories()
      .subscribe(categories => {
          this.categories = categories;
      });
   }

   selectCategory(category: Category) {
      if (category === this.selectedCategory) {
        this.selectedCategory = null;
      } else {
        this.selectedCategory = category;
      }
    }

    deleteSubcategory(subcategory: Subcategory) {
      let index: number = this.selectedCategory.subcategories.indexOf(subcategory);
      this.selectedCategory.subcategories.splice(index, 1);

      this.categoryService.updateCategory(this.selectedCategory);
    }

    deleteCategory(category: Category) {
      let index: number = this.categories.indexOf(category);
      this.categories.splice(index, 1);

      this.categoryService.deleteCatgory(category);
    }


  ngOnDestroy() {
    this.categorySubscription.unsubscribe();
  }
}
