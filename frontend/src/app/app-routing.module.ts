import { CategoryListComponent } from './category-list/category-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './not-found.component';
import { CategoryPopupComponent } from './category-list/category-dialog/category-dialog.component';
import { SubcategoryPopupComponent } from './category-list/subcategory-dialog/subcategory-dialog.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/auth.guard';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Register' }
  },
  {
    path: 'category-list',
    canActivate: [AuthGuard],
    component: CategoryListComponent
  },
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
  { path: '', redirectTo: '/category-list', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
