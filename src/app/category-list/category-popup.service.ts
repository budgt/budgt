import { Category } from './../models/category';
import { CategoryService } from './category.service';
import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material';

@Injectable()
export class CategoryPopupService {
    private matDialogRef: MatDialogRef<Component>;

    constructor(
        private dialogService: MatDialog,
        private router: Router,
        private categoryService: CategoryService
    ) {
        this.matDialogRef = null;
    }

    open(component: Component, id?: number): Promise<MatDialogRef<Component>> {
        return new Promise<MatDialogRef<Component>>((resolve, reject) => {
            const isOpen = this.matDialogRef !== null;
            if (isOpen) {
                resolve(this.matDialogRef);
            }

            if (id) {
                this.categoryService.getCategoryById(id)
                    .subscribe(category => {
                        this.matDialogRef = this.categoryDialogRef(component, category);
                        resolve(this.matDialogRef);
                    });
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
            height: '550px',
            width: '800px',
            data: category
        });

        dialogRef.afterClosed().subscribe(result => {
            this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.matDialogRef = null;
        });

        return dialogRef;
    }
}
