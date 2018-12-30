import { CategoryService } from '../category.service';
import { Category } from '../../models/category';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CategoryPopupService } from '../category-popup.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent implements OnInit {
  category: Category;
  isSaving: boolean;

  constructor(
    public activeDialog: MatDialogRef<Component>,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: Category
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.category = this.data;
  }

  clear() {
    this.activeDialog.close('cancel');
  }

  save() {
    this.isSaving = true;
    this.category.id === undefined
      ? this.subscribeToSaveResponse(this.categoryService.createCategory(this.category))
      : this.subscribeToSaveResponse(this.categoryService.updateCategory(this.category));
  }

  private subscribeToSaveResponse(result: Observable<Category>) {
    result.subscribe(category => this.onSaveSuccess(category), (res: HttpErrorResponse) => this.onSaveError());
  }

  private onSaveSuccess(result: Category) {
    this.isSaving = false;
    this.activeDialog.close(result);
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
    private categoryPopupService: CategoryPopupService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.categoryPopupService.open(CategoryDialogComponent as Component, this.categoryService.selectedCategory);
      } else {
        // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
        setTimeout(() => {
          this.categoryPopupService.open(CategoryDialogComponent as Component, new Category());
        }, 0);
      }
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}