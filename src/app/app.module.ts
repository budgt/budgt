import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryService } from './category-list/category.service';


@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    CategoryListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    CategoryService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
