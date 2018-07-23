import { CategoryService } from './category.service';
import { Category } from './../models/category';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CategoryPopupService } from './category-popup.service';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent implements OnInit {
    category: Category;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private categoryService: CategoryService
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.category.id !== undefined) {
            this.subscribeToSaveResponse(
                this.categoryService.updateCategory(this.category));
        } else {
            this.subscribeToSaveResponse(
                this.categoryService.createCategory(this.category));
        }
    }

    private subscribeToSaveResponse(result: Observable<Category>) {
        result.subscribe((category) =>
            this.onSaveSuccess(category), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Category) {
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'category-popup',
    template: ''
})
export class CategoryPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private categoryPopupService: CategoryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.categoryPopupService
                    .open(CategoryDialogComponent as Component, params['id']);
            } else {
                this.categoryPopupService
                    .open(CategoryDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

