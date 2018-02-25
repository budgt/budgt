import { Injectable } from '@angular/core';

import { Category } from './../../models/category';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class CategoryService {
  private categoryUrl = 'http://localhost:3000/category';

  constructor(private http: HttpClient) { }

    /**
   * Returns all categories
   */
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryUrl)
      .pipe(
        catchError(this.handleError('getAllCategories', []))
      );
  }

    /**
   * Returns a specific category
   * @param id - id of the category to fetch
   */
  getCategoryById(id: String): Observable<Category> {
    return this.http.get<Category>(this.categoryUrl + '/' + id)
      .pipe(
        catchError(this.handleError<Category>('getCategory id=' + id))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
