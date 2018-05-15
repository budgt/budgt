import { Category } from './../models/category';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent implements OnInit {

  constructor(public category: Category) { }

  ngOnInit() {
  }

}
