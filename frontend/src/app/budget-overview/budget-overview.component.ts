import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';
import { Category } from '../models/category';
import { Subcategory } from '../models/subcategory';

@Component({
  selector: 'app-budget-overview',
  templateUrl: './budget-overview.component.html',
  styleUrls: ['./budget-overview.component.scss']
})
export class BudgetOverviewComponent implements OnInit, OnDestroy {
  categorySubscription: Subscription;
  displayedColumns: string[] = ['name', 'amount'];

  subcategory = new Subcategory(1, 'First', 1000);
  category = new Category(1, 'Cat1', categoryType.INCOME, 3000);
  subcategory2 = new Subcategory(2, 'Second', 1000);
  category2 = new Category(123, 'Cat2', categoryType.EXPENSE, 3000);
  subcategory3 = new Subcategory(123, 'Third', 1000);
  category3 = new Category(123, 'Cat3', categoryType.INCOME, 3000);
  subcategory4 = new Subcategory(123, 'Fourth', 1000);
  category4 = new Category(123, 'Cat4', categoryType.EXPENSE, 3000);
  subcategory5 = new Subcategory(123, 'Fifth', 1000);
  subcategory6 = new Subcategory(123, 'Sixth', 1000);
  categories: Category[];

  constructor(public categoryService: CategoryService) {
    this.category.subcategories = [this.subcategory, this.subcategory2, this.subcategory3];
    this.category2.subcategories = [this.subcategory4];
    this.category3.subcategories = [this.subcategory5];
    this.category4.subcategories = [this.subcategory6];
    this.categories = [this.category, this.category2, this.category3, this.category4];
  }

  ngOnInit() {
    this.categorySubscription = this.categoryService.getCategories().subscribe(categories => {
      this.categoryService.categories = categories;
    });
  }

  ngOnDestroy() {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
  }
}

enum categoryType {
  INCOME,
  EXPENSE
}
