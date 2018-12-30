import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SubcategoryService } from '../../../app/category-list/subcategory.service';
import { Subcategory } from '../../../app/models/subcategory';
import { Category } from '../../../app/models/category';
import { CategoryService } from '../../../app/category-list/category.service';
import { of } from 'rxjs';

describe('Service Tests', () => {
  describe('Subcategory Service', () => {
    let injector: TestBed;
    let subcategoryService: SubcategoryService;
    let categoryService: CategoryService;

    let category;
    let subcategory;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [CategoryService, SubcategoryService]
      });
      injector = getTestBed();
      subcategoryService = injector.get(SubcategoryService);
      categoryService = injector.get(CategoryService);
      subcategory = new Subcategory(123);
      category = new Category(123);
      category.subcategories = [subcategory];
    });

    describe('updateSubcategory', () => {
      it('should update the subcategory', () => {
        subcategory.name = 'New name';

        subcategoryService.updateSubcategory(category, subcategory);

        expect(category.subcategories[0].name).toEqual(subcategory.name);
      });

      it('should call updateCategory', () => {
        subcategory.name = 'New name';
        spyOn(subcategoryService, 'updateSubcategory').and.callThrough();
        spyOn(categoryService, 'updateCategory').and.returnValue(of(category));

        subcategoryService.updateSubcategory(category, subcategory);

        expect(subcategoryService.updateSubcategory).toHaveBeenCalledWith(category, subcategory);
        expect(categoryService.updateCategory).toHaveBeenCalledWith(category);
      });
    });

    describe('createSubcategory', () => {
      it('should add the subcategory', () => {
        let newSubcategory = new Subcategory(456);

        subcategoryService.createSubcategory(category, newSubcategory);

        expect(category.subcategories.length).toEqual(2);
        expect(category.subcategories[1]).toEqual(newSubcategory);
      });

      it('should call updateCategory', () => {
        subcategory.name = 'New name';
        spyOn(subcategoryService, 'updateSubcategory').and.callThrough();
        spyOn(categoryService, 'updateCategory').and.returnValue(of(category));

        subcategoryService.updateSubcategory(category, subcategory);

        expect(subcategoryService.updateSubcategory).toHaveBeenCalledWith(category, subcategory);
        expect(categoryService.updateCategory).toHaveBeenCalledWith(category);
      });
    });
  });
});
