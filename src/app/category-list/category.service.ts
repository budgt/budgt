import { Injectable } from '@angular/core';

import { Category } from '../models/category';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class CategoryService {
  private categoryUrl = 'https://api.budgt.de/category';

  constructor(private http: HttpClient) { }

    /**
   * Returns all categories
   */
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryUrl)
      .pipe(
        catchError(this.handleError('getAllCategories', []))
      );
  }

    /**
   * Returns a specific category
   * @param id - id of the category to fetch
   */
  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(this.categoryUrl + '/' + id)
      .pipe(
        catchError(this.handleError<Category>('getCategory id=' + id))
      );
  }

    /**
   * Updates a category
   * @param category - the new version of the category
   */
  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(this.categoryUrl + '/' + category.id, category);
  }

  /**
   * Creates a new Category
   * @param category - the new category
   */
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.categoryUrl, category);
  }


  /**
   * Deletes a Category
   * @param category - category to delete
   */
  deleteCatgory(category: Category) {
    return this.http.delete(this.categoryUrl + '/' + category.id );
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
      return of(result);
    };
  }

}
