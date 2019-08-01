import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './not-found.component';
import { CategoryPopupService } from './category-list/category-popup.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryService } from './category-list/category.service';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { CategoryDialogComponent, CategoryPopupComponent } from './category-list/category-dialog/category-dialog.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { SubcategoryDialogComponent, SubcategoryPopupComponent } from './category-list/subcategory-dialog/subcategory-dialog.component';
import { SubcategoryService } from './category-list/subcategory.service';
import { SubcategoryPopupService } from './category-list/subcategory-popup.service';
import { LoadingInterceptor } from './interceptors/loading-interceptor';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { TokenInterceptor } from './interceptors/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    CategoryListComponent,
    CategoryDialogComponent,
    CategoryPopupComponent,
    PageNotFoundComponent,
    SubcategoryDialogComponent,
    SubcategoryPopupComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule, //
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [
    CategoryService, //
    CategoryPopupService,
    SubcategoryService,
    SubcategoryPopupService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  entryComponents: [
    CategoryDialogComponent, //
    SubcategoryDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
