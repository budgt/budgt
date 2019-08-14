import { TestBed, getTestBed, fakeAsync, tick } from '@angular/core/testing';
import { Category } from '../../../app/models/category';
import { CategoryPopupService } from '../../../app/category-list/category-popup.service';
import { Component } from '@angular/core';
import { MockComponent } from './helpers/mock-component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MockActiveDialog } from './helpers/mock-active-dialog.service';
import { BudgtTestModule } from '../test.module';

describe('Service Tests', () => {
  describe('Category Popup Service', () => {
    let injector: TestBed;
    let service: CategoryPopupService;
    let category: Category;
    let component: Component;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BudgtTestModule],
        providers: [
          CategoryPopupService,
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
      service = injector.get(CategoryPopupService);
      component = MockComponent({ selector: 'mock-component' });
    });

    describe('open', () => {
      it('should call categoryDialogRef with existing category if provided', fakeAsync(() => {
        let dialogref = new MockActiveDialog<Component>();

        spyOn(service, 'categoryDialogRef').and.returnValue(dialogref);

        service.open(component, category);
        tick();

        expect(service.categoryDialogRef).toHaveBeenCalledWith(component, category);
      }));

      it('should call categoryDialogRef with new category if none provided', fakeAsync(() => {
        let dialogref = new MockActiveDialog<Component>();

        spyOn(service, 'categoryDialogRef').and.returnValue(dialogref);

        service.open(component);
        tick();

        expect(service.categoryDialogRef).toHaveBeenCalledWith(component, new Category());
      }));
    });
  });
});
