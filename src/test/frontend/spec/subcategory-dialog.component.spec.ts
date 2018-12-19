import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryDialogComponent } from '../../../app/category-list/subcategory-dialog/subcategory-dialog.component';

describe('SubcategoryDialogComponent', () => {
  let component: SubcategoryDialogComponent;
  let fixture: ComponentFixture<SubcategoryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcategoryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
