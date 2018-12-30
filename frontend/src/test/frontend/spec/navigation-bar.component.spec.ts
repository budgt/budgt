import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationBarComponent } from '../../../app/navigation-bar/navigation-bar.component';
import { MatToolbarModule } from '@angular/material';

describe('NavigationBarComponent', () => {
  let component: NavigationBarComponent;
  let fixture: ComponentFixture<NavigationBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationBarComponent],
      imports: [MatToolbarModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});