import { NgModule } from '@angular/core';
import { MockActiveDialog } from './spec/helpers/mock-active-dialog.service';
import { Router } from '@angular/router';
import { MockRouter } from './spec/helpers/mock-route.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogRef } from '@angular/material';

@NgModule({
    providers: [
        {
            provide: MatDialogRef,
            useClass: MockActiveDialog
        },
        {
            provide: Router,
            useClass: MockRouter
        },

    ],
    imports: [HttpClientTestingModule]
})
export class BudgtTestModule { }
