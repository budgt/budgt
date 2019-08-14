import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loading: boolean;

  constructor() {}

  public setLoading(loading: boolean) {
    this.loading = loading;
  }

  public isLoading() {
    return this.loading;
  }
}
