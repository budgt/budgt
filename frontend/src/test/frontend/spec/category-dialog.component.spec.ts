import { fakeAsync, ComponentFixture, TestBed, inject, tick, async } from '@angular/core/testing';

import { of } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryDialogComponent } from '../../../app/category-list/category-dialog/category-dialog.component';
import { CategoryService } from '../../../app/category-list/category.service';
import { BudgtTestModule } from '../test.module';
import { MockActiveDialog } from './helpers/mock-active-dialog.service';
import { Category } from '../../../app/models/category';

describe('CategoryDialogComponent', () => {
  let component: CategoryDialogComponent;
  let fixture: ComponentFixture<CategoryDialogComponent>;
  let service: CategoryService;
  let mockActiveDialog: MockActiveDialog<any, any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BudgtTestModule],
      declarations: [CategoryDialogComponent],
      providers: [
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
      .overrideTemplate(CategoryDialogComponent, '')
      .overrideComponent(CategoryDialogComponent, {
        set: {
          styleUrls: []
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryDialogComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(CategoryService);
    mockActiveDialog = fixture.debugElement.injector.get(MatDialogRef) as any;
  });

  describe('save', () => {
    it('Should call update categoryService on save for existing entity', inject(
      [],
      fakeAsync(() => {
        const entity = new Category(123);
        jest.spyOn(service, 'updateCategory').mockReturnValue(of(entity));
        jest.spyOn(mockActiveDialog, 'close').mockReturnValue();
        component.category = entity;

        component.save();
        tick();

        expect(service.updateCategory).toHaveBeenCalledWith(entity);
        expect(component.isSaving).toEqual(false);
        expect(mockActiveDialog.close).toHaveBeenCalledWith(entity);
      })
    ));

    it('Should call create categoryService on save for new entity', inject(
      [],
      fakeAsync(() => {
        const entity = new Category();
        jest.spyOn(service, 'createCategory').mockReturnValue(of(entity));
        component.category = entity;
        service.categories = [];

        component.save();
        tick();

        expect(service.createCategory).toHaveBeenCalledWith(entity);
        expect(component.isSaving).toEqual(false);
        // expect(mockActiveDialog.dismissSpy).toHaveBeenCalled();
      })
    ));
  });
});
