import { BudgtTestModule } from './../test.module';
import { Category } from './../../../app/models/category';
import { fakeAsync, ComponentFixture, TestBed, inject, tick, async } from '@angular/core/testing';

import { CategoryDialogComponent } from '../../../app/category-list/category-dialog.component';
import { CategoryService } from '../../../app/category-list/category.service';
import { of } from 'rxjs';
import { MatDialogRef } from '@angular/material';
import { MockActiveDialog } from './helpers/mock-active-dialog.service';

describe('CategoryDialogComponent', () => {
  let component: CategoryDialogComponent;
  let fixture: ComponentFixture<CategoryDialogComponent>;
  let service: CategoryService;
  let mockActiveDialog: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BudgtTestModule
      ],
      declarations: [CategoryDialogComponent],
      providers: [
        CategoryService
      ]
    })
      .overrideTemplate(CategoryDialogComponent, '')
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryDialogComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(CategoryService);
    mockActiveDialog = fixture.debugElement.injector.get(MatDialogRef);
  });

  describe('save', () => {
    it('Should call update categoryService on save for existing entity',
      inject([],
        fakeAsync(() => {
          const entity = new Category(123);
          spyOn(service, 'updateCategory').and.returnValue(of(entity));
          component.category = entity;

          component.save();
          tick();

          expect(service.updateCategory).toHaveBeenCalledWith(entity);
          expect(component.isSaving).toEqual(false);
          expect(mockActiveDialog.dismissSpy).toHaveBeenCalled();
        })
      )
    );

    it('Should call create categoryService on save for new entity',
      inject([],
        fakeAsync(() => {
          const entity = new Category();
          spyOn(service, 'createCategory').and.returnValue(of(entity));
          component.category = entity;

          component.save();
          tick();

          expect(service.createCategory).toHaveBeenCalledWith(entity);
          expect(component.isSaving).toEqual(false);
          expect(mockActiveDialog.dismissSpy).toHaveBeenCalled();

        })
      )
    );
  });
});
