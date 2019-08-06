import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { CategoryListComponent } from '../../../app/category-list/category-list.component';
import { CategoryService } from '../../../app/category-list/category.service';
import { Category } from '../../../app/models/category';
import { RouterTestingModule } from '@angular/router/testing';

describe('Component Tests', () => {
  describe('Category List Component', () => {
    let comp: CategoryListComponent;
    let fixture: ComponentFixture<CategoryListComponent>;
    let service: CategoryService;

    let category1 = new Category(123);
    let category2 = new Category(456);
    let subCategory1 = new Category(1234);
    let subCategory2 = new Category(5678);

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule],
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
        expect(service.categories[0]).toEqual(jasmine.objectContaining(category1));
      });
    });

    describe('selectCategory', () => {
      it('should set selectedCategory', () => {
        comp.selectCategory(category1);

        expect(service.selectedCategory).toEqual(category1);
      });
    });

    describe('deleteCategory', () => {
      beforeEach(() => {
        spyOn(service, 'getCategories').and.returnValue(of([category1, category2]));

        comp.ngOnInit();
      });

      it('should remove the category from the list', () => {
        comp.deleteCategory(category1);

        expect(service.categories[0]).toEqual(jasmine.objectContaining(category2));
      });

      it('should call #deleteCatgory', () => {
        spyOn(service, 'deleteCatgory').and.returnValue(of(category2));

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

        expect(service.selectedCategory.subcategories[0]).toEqual(jasmine.objectContaining(subCategory2));
      });

      it('should call #updateCategory', () => {
        spyOn(service, 'updateCategory').and.returnValue(of(subCategory2));

        comp.deleteSubcategory(subCategory2);

        expect(service.updateCategory).toHaveBeenCalledWith(category1);
      });
    });
  });
});
