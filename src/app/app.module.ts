import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryService } from './category-list/category.service';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { CategoryDialogComponent } from './category-list/category-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    CategoryListComponent,
    CategoryDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    CategoryService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
