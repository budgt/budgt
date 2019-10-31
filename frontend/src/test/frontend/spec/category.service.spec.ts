import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Category } from '../../../app/models/category';
import { CategoryService } from '../../../app/category-list/category.service';

describe('Service Tests', () => {
  describe('Category Service', () => {
    let injector: TestBed;
    let service: CategoryService;
    let httpMock: HttpTestingController;

    const resourceUrl = 'http://localhost/api/category-service/categories';
    let category1 = new Category(123);

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [CategoryService]
      });
      injector = getTestBed();
      service = injector.get(CategoryService);
      httpMock = injector.get(HttpTestingController);
    });

    describe('getCategories', () => {
      it('should call the correct URL', () => {
        service.getCategories().subscribe(() => {});

        const req = httpMock.expectOne({ method: 'GET' });

        expect(req.request.url).toEqual(resourceUrl);
      });

      it('should return all categories', () => {
        service.getCategories().subscribe(received => {
          expect(received.length).toEqual(2);
        });

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([{ id: 1 }, { id: 2 }]);
      });
    });

    describe('getCategoryById', () => {
      it('should call the correct URL', () => {
        service.getCategoryById(1).subscribe(() => {});

        const req = httpMock.expectOne({ method: 'GET' });

        expect(req.request.url).toEqual(resourceUrl + '/' + 1);
      });

      it('should return the correct category', () => {
        service.getCategoryById(1).subscribe(received => {
          expect(received.id).toEqual(1);
        });

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush({ id: 1 });
      });

      it('should propagate a not found response', () => {
        service.getCategoryById(1).subscribe((_error: any) => {
          expect(_error.status).toEqual(404);
        });

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush('Invalid request parameters', {
          status: 404,
          statusText: 'Bad Request'
        });
      });
    });

    describe('updateCategory', () => {
      it('should call the correct URL', () => {
        service.updateCategory(category1).subscribe(() => {});

        const req = httpMock.expectOne({ method: 'PUT' });

        expect(req.request.url).toEqual(resourceUrl + '/' + 123);
      });

      it('should put the new category', () => {
        service.updateCategory(category1).subscribe(received => {
          expect(received).toEqual(category1);
        });

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(category1);
      });

      it('should propagate a not found response', () => {
        service.updateCategory(new Category(456)).subscribe((_error: any) => {
          expect(_error.status).toEqual(404);
        });

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush('Invalid request parameters', {
          status: 404,
          statusText: 'Bad Request'
        });
      });
    });

    describe('createCategory', () => {
      it('should call the correct URL', () => {
        service.createCategory(category1).subscribe(() => {});

        const req = httpMock.expectOne({ method: 'POST' });

        expect(req.request.url).toEqual(resourceUrl);
      });

      it('should post the new category', () => {
        service.createCategory(category1).subscribe(received => {
          expect(received).toEqual(category1);
        });

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(category1);
      });
    });

    describe('deleteCatgory', () => {
      it('should call the correct URL', () => {
        service.deleteCatgory(category1).subscribe(() => {});

        const req = httpMock.expectOne({ method: 'DELETE' });

        expect(req.request.url).toEqual(resourceUrl + '/' + 123);
      });

      it('should delete the new category', () => {
        service.deleteCatgory(category1).subscribe(received => {
          expect(received).toEqual(category1);
        });

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush(category1);
      });

      it('should propagate a not found response', () => {
        service.deleteCatgory(new Category(456)).subscribe((_error: any) => {
          expect(_error.status).toEqual(404);
        });

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush('Invalid request parameters', {
          status: 404,
          statusText: 'Bad Request'
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
