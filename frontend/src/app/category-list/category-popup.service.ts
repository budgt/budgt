import { Category } from './../models/category';
import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

@Injectable()
export class CategoryPopupService {
  private matDialogRef: MatDialogRef<Component>;

  constructor(private dialogService: MatDialog, private router: Router) {
    this.matDialogRef = null;
  }

  open(component: Component, category?: Category): Promise<MatDialogRef<Component>> {
    return new Promise<MatDialogRef<Component>>((resolve, reject) => {
      const isOpen = this.matDialogRef !== null;
      if (isOpen) {
        resolve(this.matDialogRef);
      }

      if (category) {
        // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
        setTimeout(() => {
          this.matDialogRef = this.categoryDialogRef(component, category);
          resolve(this.matDialogRef);
        }, 0);
      } else {
        // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
        setTimeout(() => {
          this.matDialogRef = this.categoryDialogRef(component, new Category());
          resolve(this.matDialogRef);
        }, 0);
      }
    });
  }

  categoryDialogRef(component, category: Category): MatDialogRef<Component> {
    const dialogRef = this.dialogService.open(component, {
      data: category,
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate([{ outlets: { popup: null } }], {
        replaceUrl: true,
        queryParamsHandling: 'merge'
      });
      this.matDialogRef = null;
    });

    return dialogRef;
  }
}
