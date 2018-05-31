import { NgModule } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MockActiveModal } from './spec/helpers/mock-active-modal.service';
import { Router } from '@angular/router';
import { MockRouter } from './spec/helpers/mock-route.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@NgModule({
    providers: [
        {
            provide: NgbActiveModal,
            useClass: MockActiveModal
        },
        {
            provide: NgbModal,
            useValue: null
        },
        {
            provide: Router,
            useClass: MockRouter
        },

    ],
    imports: [HttpClientTestingModule]
})
export class BudgtTestModule { }
