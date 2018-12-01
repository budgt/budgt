import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './not-found.component';
import { CategoryPopupService } from './category-list/category-popup.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryService } from './category-list/category.service';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { CategoryDialogComponent, CategoryPopupComponent } from './category-list/category-dialog.component';
import { RouterModule, Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    CategoryListComponent,
    CategoryDialogComponent,
    CategoryPopupComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule
  ],
  providers: [
    CategoryService,
    CategoryPopupService
  ],
  entryComponents: [
    CategoryDialogComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
