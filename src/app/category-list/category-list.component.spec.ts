import { Category } from './../models/category';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryListComponent } from './category-list.component';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

describe('Component Tests', () => {

    describe('BankAccount Management Component', () => {
        let comp: CategoryListComponent;
        let fixture: ComponentFixture<CategoryListComponent>;
        let service: CategoryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule],
                declarations: [CategoryListComponent],
                providers: [
                    CategoryService
                ]
            })
                .overrideTemplate(CategoryListComponent, '')
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CategoryListComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CategoryService);
        });

        describe('OnInit', () => {
            it('Should #getCategorieson init', () => {
                // GIVEN
                spyOn(service, 'getCategories').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Category(123)],
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.getCategories).toHaveBeenCalled();
                expect(comp.categories[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});

