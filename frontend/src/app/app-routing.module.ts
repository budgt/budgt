import { CategoryListComponent } from './category-list/category-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './not-found.component';
import { CategoryPopupComponent } from './category-list/category-dialog/category-dialog.component';
import { SubcategoryPopupComponent } from './category-list/subcategory-dialog/subcategory-dialog.component';
import { BudgetOverviewComponent } from './budget-overview/budget-overview.component';

const appRoutes: Routes = [
  { path: 'category-list', component: CategoryListComponent },
  {
    path: 'category-dialog/edit/:id',
    component: CategoryPopupComponent,
    data: {
      pageTitle: 'Edit Category'
    },
    outlet: 'popup'
  },
  {
    path: 'category-dialog/create',
    component: CategoryPopupComponent,
    data: {
      pageTitle: 'Create Category'
    },
    outlet: 'popup'
  },
  {
    path: 'subcategory-dialog/create',
    component: SubcategoryPopupComponent,
    data: {
      pageTitle: 'Create Subcategory'
    },
    outlet: 'popup'
  },
  {
    path: 'subcategory-dialog/edit/:id',
    component: SubcategoryPopupComponent,
    data: {
      pageTitle: 'Edit Subcategory'
    },
    outlet: 'popup'
  },
  { path: 'budget-overview', component: BudgetOverviewComponent },
  { path: '', redirectTo: '/category-list', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
