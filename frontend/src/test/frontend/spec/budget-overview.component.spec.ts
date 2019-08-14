import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetOverviewComponent } from '../../../app/budget-overview/budget-overview.component';

describe('BudgetOverviewComponent', () => {
  let component: BudgetOverviewComponent;
  let fixture: ComponentFixture<BudgetOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BudgetOverviewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
