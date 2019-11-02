import { BudgtTestModule } from './../test.module';
import { fakeAsync, ComponentFixture, TestBed, inject, tick, async } from '@angular/core/testing';

import { of } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MockActiveDialog } from './helpers/mock-active-dialog.service';
import { FormsModule } from '@angular/forms';
import { SubcategoryDialogComponent } from '../../../app/category-list/subcategory-dialog/subcategory-dialog.component';
import { SubcategoryService } from '../../../app/category-list/subcategory.service';
import { CategoryService } from '../../../app/category-list/category.service';
import { Category } from '../../../app/models/category';
import { Subcategory } from '../../../app/models/subcategory';

describe('SubcategoryDialogComponent', () => {
  let component: SubcategoryDialogComponent;
  let fixture: ComponentFixture<SubcategoryDialogComponent>;
  let subcategoryService: SubcategoryService;
  let categoryService: CategoryService;
  let mockActiveDialog: MockActiveDialog<any, any>;

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
      .overrideComponent(SubcategoryDialogComponent, {
        set: {
          styleUrls: []
        }
      })
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

        jest.spyOn(subcategoryService, 'updateSubcategory');
        jest.spyOn(categoryService, 'updateCategory').mockReturnValue(of(category));
        jest.spyOn(mockActiveDialog, 'close').mockReturnValue();

        component.subcategory = subcategory;

        component.save();
        tick();

        expect(subcategoryService.updateSubcategory).toHaveBeenCalledWith(category, subcategory);
        expect(categoryService.updateCategory).toHaveBeenCalledWith(category);
        expect(component.isSaving).toEqual(false);
        expect(mockActiveDialog.close).toHaveBeenCalledWith(category);
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

        jest.spyOn(subcategoryService, 'createSubcategory');
        jest.spyOn(categoryService, 'updateCategory').mockReturnValue(of(category));
        jest.spyOn(mockActiveDialog, 'close').mockReturnValue();

        component.save();
        tick();

        expect(subcategoryService.createSubcategory).toHaveBeenCalledWith(category, subcategory);
        expect(categoryService.updateCategory).toHaveBeenCalledWith(category);
        expect(component.isSaving).toEqual(false);
        expect(mockActiveDialog.close).toHaveBeenCalledWith(category);
      })
    ));
  });
});
