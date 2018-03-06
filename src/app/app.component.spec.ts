import { CategoryListComponent } from './category-list/category-list.component';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { CategoryService } from './category-list/category.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavigationBarComponent,
        CategoryListComponent
      ],
      imports: [
        BrowserModule,
        HttpClientModule,
      ],
      providers: [
        CategoryService
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
