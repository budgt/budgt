import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Subcategory } from '../models/subcategory';
import { Category } from '../models/category';

@Injectable()
export class SubcategoryPopupService {
  private matDialogRef: MatDialogRef<Component>;

  constructor(private dialogService: MatDialog, private router: Router) {
    this.matDialogRef = null;
  }

  open(component: Component, category: Category, subcategoryID?: number): Promise<MatDialogRef<Component>> {
    return new Promise<MatDialogRef<Component>>((resolve, reject) => {
      const isOpen = this.matDialogRef !== null;
      if (isOpen) {
        resolve(this.matDialogRef);
      }

      if (subcategoryID) {
        // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError in dev mode
        setTimeout(() => {
          let sc = category.subcategories.find(subcategory => subcategory.id === Number(subcategoryID));
          this.matDialogRef = this.subcategoryDialogRef(component, sc);
          resolve(this.matDialogRef);
        }, 0);
      } else {
        // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError in dev mode
        setTimeout(() => {
          this.matDialogRef = this.subcategoryDialogRef(component, new Subcategory());
          resolve(this.matDialogRef);
        }, 0);
      }
    });
  }

  subcategoryDialogRef(component, subcategory: Subcategory): MatDialogRef<Component> {
    const dialogRef = this.dialogService.open(component, {
      data: subcategory,
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
      this.matDialogRef = null;
    });

    return dialogRef;
  }
}
