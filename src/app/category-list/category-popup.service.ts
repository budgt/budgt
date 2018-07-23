import { Observable } from 'rxjs';
import { Category } from './../models/category';
import { CategoryService } from './category.service';
import { Injectable, Component } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Injectable()
export class CategoryPopupService {
  private ngbModalRef: NgbModalRef;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private categoryService: CategoryService
  ) {
    this.ngbModalRef = null;
  }

  open(component: Component, id?: number): Promise<NgbModalRef> {
    return new Promise<NgbModalRef>((resolve, reject) => {
        const isOpen = this.ngbModalRef !== null;
        if (isOpen) {
            resolve(this.ngbModalRef);
        }

        if (id) {
            this.categoryService.getCategoryById(id)
                .subscribe(category => {
                    this.ngbModalRef = this.categoryModalRef(component, category);
                    resolve(this.ngbModalRef);
                  });
        } else {
            // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
            setTimeout(() => {
                this.ngbModalRef = this.categoryModalRef(component, new Category());
                resolve(this.ngbModalRef);
            }, 0);
        }
    });
}

categoryModalRef(component: Component, category: Category): NgbModalRef {
    const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
    modalRef.componentInstance.category = category;
    modalRef.result.then((result) => {
        this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
        this.ngbModalRef = null;
    }, (reason) => {
        this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
        this.ngbModalRef = null;
    });
    return modalRef;
}
}
