import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Subcategory } from '../models/subcategory';
import { Category } from '../models/category';
import { CategoryService } from './category.service';

@Injectable()
export class SubcategoryPopupService {
    private matDialogRef: MatDialogRef<Component>;

    constructor(
        private dialogService: MatDialog,
        private router: Router,
    ) {
        this.matDialogRef = null;
    }

    open(component: Component, category: Category, subcategoryID?: number): Promise<MatDialogRef<Component>> {
        return new Promise<MatDialogRef<Component>>((resolve, reject) => {
            const isOpen = this.matDialogRef !== null;
            if (isOpen) {
                resolve(this.matDialogRef);
            }

            if (subcategoryID) {
                this.matDialogRef = this.subcategoryDialogRef(component, category.subcategories.get(subcategoryID));
                resolve(this.matDialogRef);
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
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
