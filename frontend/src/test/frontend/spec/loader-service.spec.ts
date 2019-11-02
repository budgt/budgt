import { TestBed } from '@angular/core/testing';
import { LoaderService } from '../../../app/category-list/loader.service.service';

describe('LoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoaderService = TestBed.get(LoaderService);
    expect(service).toBeTruthy();
  });
});
