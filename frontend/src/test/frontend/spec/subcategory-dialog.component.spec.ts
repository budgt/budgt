import { BudgtTestModule } from './../test.module';
import { Category } from './../../../app/models/category';
import { fakeAsync, ComponentFixture, TestBed, inject, tick, async } from '@angular/core/testing';

import { CategoryService } from '../../../app/category-list/category.service';
import { of } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MockActiveDialog } from './helpers/mock-active-dialog.service';
import { SubcategoryDialogComponent } from '../../../app/category-list/subcategory-dialog/subcategory-dialog.component';
import { SubcategoryService } from '../../../app/category-list/subcategory.service';
import { Subcategory } from '../../../app/models/subcategory';
import { FormsModule } from '@angular/forms';

describe('SubcategoryDialogComponent', () => {
  let component: SubcategoryDialogComponent;
  let fixture: ComponentFixture<SubcategoryDialogComponent>;
  let subcategoryService: SubcategoryService;
  let categoryService: CategoryService;
  let mockActiveDialog: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BudgtTestModule, FormsModule],
      declarations: [SubcategoryDialogComponent],
      providers: [
        SubcategoryService,
        CategoryService,
        {
          provide: MatDialogRef,
          useClass: MockActiveDialog
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }
      ]
    })
      .overrideTemplate(SubcategoryDialogComponent, '')
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategoryDialogComponent);
    component = fixture.componentInstance;
    subcategoryService = fixture.debugElement.injector.get(SubcategoryService);
    categoryService = fixture.debugElement.injector.get(CategoryService);
    mockActiveDialog = fixture.debugElement.injector.get(MatDialogRef);
  });

  describe('save', () => {
    it('Should call update subcategoryService on save for existing entity', inject(
      [],
      fakeAsync(() => {
        const category = new Category(123);
        const subcategory = new Subcategory(123);
        category.subcategories = [subcategory];

        component.subcategory = subcategory;
        categoryService.selectedCategory = category;

        spyOn(subcategoryService, 'updateSubcategory').and.callThrough();
        spyOn(categoryService, 'updateCategory').and.returnValue(of(category));

        component.subcategory = subcategory;

        component.save();
        tick();

        expect(subcategoryService.updateSubcategory).toHaveBeenCalledWith(category, subcategory);
        expect(categoryService.updateCategory).toHaveBeenCalledWith(category);
        expect(component.isSaving).toEqual(false);
        expect(mockActiveDialog.dismissSpy).toHaveBeenCalled();
      })
    ));

    it('Should call create subcategoryService on save for new entity', inject(
      [],
      fakeAsync(() => {
        const category = new Category(123);
        const subcategory = new Subcategory();
        category.subcategories = [];

        component.subcategory = subcategory;
        categoryService.selectedCategory = category;

        spyOn(subcategoryService, 'createSubcategory').and.callThrough();
        spyOn(categoryService, 'updateCategory').and.returnValue(of(category));

        component.save();
        tick();

        expect(subcategoryService.createSubcategory).toHaveBeenCalledWith(category, subcategory);
        expect(categoryService.updateCategory).toHaveBeenCalledWith(category);
        expect(component.isSaving).toEqual(false);
        expect(mockActiveDialog.dismissSpy).toHaveBeenCalled();
      })
    ));
  });
});
