import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { CategoryService } from './category.service';

describe('Service Tests', () => {

    describe('Category Service', () => {
        let injector: TestBed;
        let service: CategoryService;
        let httpMock: HttpTestingController;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [
                    HttpClientTestingModule
                ],
                providers: [
                    CategoryService
                ]
            });
            injector = getTestBed();
            service = injector.get(CategoryService);
            httpMock = injector.get(HttpTestingController);
        });

        describe('Service methods', () => {
            it('should call correct URL', () => {
                service.getCategoryById(123).subscribe(() => {});

                const req  = httpMock.expectOne({ method: 'GET' });

                //const resourceUrl = SERVER_API_URL + 'api/bank-accounts';
                const resourceUrl = 'http://localhost:3000/category';
                expect(req.request.url).toEqual(resourceUrl + '/' + 123);
            });
            it('should return Category', () => {

                service.getCategoryById(123).subscribe((received) => {
                    expect(received.id).toEqual(123);
                });

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush({id: 123});
            });

            it('should propagate not found response', () => {

                service.getCategoryById(123).subscribe(null, (_error: any) => {
                    expect(_error.status).toEqual(404);
                });

                const req  = httpMock.expectOne({ method: 'GET' });
                req.flush('Invalid request parameters', {
                    status: 404, statusText: 'Bad Request'
                });

            });
        });

        afterEach(() => {
            httpMock.verify();
        });

    });

});