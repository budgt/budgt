import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CategoryListComponent } from '../../../app/category-list/category-list.component';
import { CategoryService } from '../../../app/category-list/category.service';
import { Category } from '../../../app/models/category';

describe('Component Tests', () => {
  describe('Category Management Component', () => {
    let comp: CategoryListComponent;
    let fixture: ComponentFixture<CategoryListComponent>;
    let service: CategoryService;

    let category1 = new Category(123);
    let category2 = new Category(456);
    let subCategory1 = new Category(1234);
    let subCategory2 = new Category(5678);

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CategoryListComponent],
        providers: [CategoryService]
      })
        .overrideTemplate(CategoryListComponent, '')
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(CategoryListComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CategoryService);
    });

    describe('OnInit', () => {
      it('should call #getCategories', () => {
        spyOn(service, 'getCategories').and.returnValue(of([category1]));

        comp.ngOnInit();

        expect(service.getCategories).toHaveBeenCalled();
        expect(comp.categories[0]).toEqual(jasmine.objectContaining(category1));
      });
    });

    describe('selectCategory', () => {
      it('should set selectedCategory', () => {
        comp.selectCategory(category1);

        expect(comp.selectedCategory).toEqual(category1);
      });
    });

    describe('deleteCategory', () => {
      beforeEach(() => {
        spyOn(service, 'getCategories').and.returnValue(of([category1, category2]));

        comp.ngOnInit();
      });

      it('should remove the category from the list', () => {
        comp.deleteCategory(category1);

        expect(comp.categories[0]).toEqual(jasmine.objectContaining(category2));
      });

      it('should call #deleteCatgory', () => {
        spyOn(service, 'deleteCatgory');

        comp.deleteCategory(category2);

        expect(service.deleteCatgory).toHaveBeenCalledWith(category2);
      });
    });

    describe('delteSubcategory', () => {
      beforeEach(() => {
        category1.subcategories = [subCategory1, subCategory2];
        spyOn(service, 'getCategories').and.returnValue(of([category1]));

        comp.ngOnInit();
        comp.selectCategory(category1);
      });

      it('should delte the subcategory', () => {
        comp.deleteSubcategory(subCategory1);

        expect(comp.selectedCategory.subcategories[0]).toEqual(jasmine.objectContaining(subCategory2));
      });

      it('should call #updateCategory', () => {
        spyOn(service, 'updateCategory');

        comp.deleteSubcategory(subCategory2);

        expect(service.updateCategory).toHaveBeenCalledWith(category1);
      });
    });
  });
});
