import { BudgtTestModule } from './../test.module';
import { Category } from './../../../app/models/category';
import { fakeAsync, ComponentFixture, TestBed, inject, tick, async, getTestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { CategoryDialogComponent } from '../../../app/category-list/category-dialog.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MockActiveModal } from './helpers/mock-active-modal.service';
import { CategoryService } from '../../../app/category-list/category.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MockRouter } from './helpers/mock-route.service';

describe('CategoryDialogComponent', () => {
  let component: CategoryDialogComponent;
  let fixture: ComponentFixture<CategoryDialogComponent>;
  let service: CategoryService;
  let mockActiveModal: any;

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
    mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
  });

  describe('save', () => {
    it('Should call update categoryService on save for existing entity',
      inject([],
        fakeAsync(() => {
          const entity = new Category(123);
          spyOn(service, 'updateCategory').and.returnValue(Observable.of(entity));
          component.category = entity;

          component.save();
          tick();

          expect(service.updateCategory).toHaveBeenCalledWith(entity);
          expect(component.isSaving).toEqual(false);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
        })
      )
    );

    it('Should call create categoryService on save for new entity',
      inject([],
        fakeAsync(() => {
          const entity = new Category();
          spyOn(service, 'createCategory').and.returnValue(Observable.of(entity));
          component.category = entity;

          component.save();
          tick();

          expect(service.createCategory).toHaveBeenCalledWith(entity);
          expect(component.isSaving).toEqual(false);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();

        })
      )
    );
  });
});
