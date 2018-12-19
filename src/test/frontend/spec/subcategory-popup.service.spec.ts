import { TestBed } from '@angular/core/testing';

import { SubcategoryPopupService } from '../../../app/category-list/subcategory-popup.service';

describe('SubcategoryPopupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubcategoryPopupService = TestBed.get(SubcategoryPopupService);
    expect(service).toBeTruthy();
  });
});
