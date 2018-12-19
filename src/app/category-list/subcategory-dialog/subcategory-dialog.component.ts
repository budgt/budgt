import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subcategory } from '../../models/subcategory';
import { SubcategoryService } from '../subcategory.service';
import { SubcategoryPopupService } from '../subcategory-popup.service';
import { Category } from '../../models/category';
import { CategoryService } from '../category.service';


@Component({
  selector: 'app-subcategory-dialog',
  templateUrl: './subcategory-dialog.component.html',
  styleUrls: ['./subcategory-dialog.component.scss']
})
export class SubcategoryDialogComponent implements OnInit {

  subcategory: Subcategory;
  isSaving: boolean;

  constructor(
    public activeDialog: MatDialogRef<Component>,
    private subcategoryService: SubcategoryService,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: Subcategory
  ) { }

  ngOnInit() {
    this.isSaving = false;
    this.subcategory = this.data;
  }

  clear() {
    this.activeDialog.close('cancel');
  }

  save() {
    this.isSaving = true;
    if (this.subcategory.id !== undefined) {
      this.subscribeToSaveResponse(
        this.subcategoryService.updateSubcategory(this.categoryService.selectedCategory, this.subcategory));
    } else {
      this.subscribeToSaveResponse(
        this.subcategoryService.createSubcategory (this.categoryService.selectedCategory, this.subcategory));
      }
  }

  private subscribeToSaveResponse(result: Observable<Subcategory>) {
    result.subscribe((subcategory) =>
      this.onSaveSuccess(subcategory), (res: HttpErrorResponse) => this.onSaveError());
  }

  private onSaveSuccess(result: Subcategory) {
    this.isSaving = false;
    this.activeDialog.close(result);
  }

  private onSaveError() {
    this.isSaving = false;
  }
}

@Component({
  selector: 'subcategory-popup',
  template: ''
})
export class SubcategoryPopupComponent implements OnInit, OnDestroy {

  routeSub: any;

  constructor(
    private route: ActivatedRoute,
    private subcategoryPopupService: SubcategoryPopupService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      if (params['create'] === true) {
        this.subcategoryPopupService.open(
          SubcategoryDialogComponent as Component,
          this.categoryService.selectedCategory,
          params['id']
        );
      } else {
        this.subcategoryPopupService.open(
          SubcategoryDialogComponent as Component,
          this.categoryService.selectedCategory,
          this.categoryService.selectedCategory.nextSubcategoryId
        );
      }
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}

