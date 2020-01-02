import { ActivatedRoute, Router } from '@angular/router';
import { SpyObject } from './spyobject';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

export class MockActivatedRoute extends ActivatedRoute {
  constructor(parameters?: any) {
    super();
    this.queryParams = of(parameters);
    this.params = of(parameters);
    this.data = of({
      ...parameters,
      pagingParams: {
        page: 10,
        ascending: false,
        predicate: 'id'
      }
    });
  }
}

@Injectable()
export class MockRouter extends SpyObject {
  navigateSpy: any;

  constructor() {
    super(Router);
    this.navigateSpy = this.spy('navigate');
  }
}
