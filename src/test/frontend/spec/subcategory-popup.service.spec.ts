import { TestBed, getTestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { MockComponent } from './helpers/mock-component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { MockActiveDialog } from './helpers/mock-active-dialog.service';
import { BudgtTestModule } from '../test.module';
import { SubcategoryPopupService } from '../../../app/category-list/subcategory-popup.service';
import { Subcategory } from '../../../app/models/subcategory';
import { Category } from '../../../app/models/category';

describe('Service Tests', () => {
  describe('Category Popup Service', () => {
    let injector: TestBed;
    let service: SubcategoryPopupService;
    let category: Category;
    let subcategory: Subcategory;
    let component: Component;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BudgtTestModule],
        providers: [
          SubcategoryPopupService,
          {
            provide: MatDialogRef,
            useClass: MockActiveDialog
          },
          {
            provide: MatDialog,
            useClass: MockActiveDialog
          }
        ]
      });
      injector = getTestBed();
      category = new Category(123);
      subcategory = new Subcategory(123);
      category.subcategories = [subcategory];
      service = injector.get(SubcategoryPopupService);
      component = MockComponent({ selector: 'mock-component' });
    });

    describe('open', () => {
      it('should call subcategoryDialogRef with existing subcategory when id is provided', fakeAsync(() => {
        let dialogref = new MockActiveDialog<Component>();

        spyOn(service, 'subcategoryDialogRef').and.returnValue(dialogref);

        service.open(component, category, 123);
        tick();

        expect(service.subcategoryDialogRef).toHaveBeenCalledWith(component, subcategory);
      }));

      it('should call subcategoryDialogRef with new subcategory if no id is provided', fakeAsync(() => {
        let dialogref = new MockActiveDialog<Component>();

        spyOn(service, 'subcategoryDialogRef').and.returnValue(dialogref);

        service.open(component, category);
        tick();

        expect(service.subcategoryDialogRef).toHaveBeenCalledWith(component, new Subcategory());
      }));
    });
  });
});
