import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { MockRouter } from './spec/helpers/mock-route.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@NgModule({
    providers: [
        {
            provide: Router,
            useClass: MockRouter
        }
    ],
    imports: [HttpClientTestingModule]
})
export class BudgtTestModule { }
