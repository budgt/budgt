import { CategoryListComponent } from './category-list/category-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './not-found.component';
import { CategoryPopupComponent } from './category-list/category-dialog/category-dialog.component';
import { SubcategoryPopupComponent } from './category-list/subcategory-dialog/subcategory-dialog.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { AccountListComponent } from './account-list/account-list.component';

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
    path: 'account-list',
    canActivate: [AuthGuard],
    component: AccountListComponent
  },
  {
    path: 'category-dialog/edit/:id',
    canActivate: [AuthGuard],
    component: CategoryPopupComponent,
    data: {
      pageTitle: 'Edit Category'
    },
    outlet: 'popup'
  },
  {
    path: 'category-dialog/create',
    canActivate: [AuthGuard],
    component: CategoryPopupComponent,
    data: {
      pageTitle: 'Create Category'
    },
    outlet: 'popup'
  },
  {
    path: 'subcategory-dialog/create',
    canActivate: [AuthGuard],
    component: SubcategoryPopupComponent,
    data: {
      pageTitle: 'Create Subcategory'
    },
    outlet: 'popup'
  },
  {
    path: 'subcategory-dialog/edit/:id',
    canActivate: [AuthGuard],
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
