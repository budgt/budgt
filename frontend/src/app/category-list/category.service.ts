import { Injectable } from '@angular/core';

import { Category } from '../models/category';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class CategoryService {
  private baseUrl = environment.baseUrl;
  private categoriesUrl = this.baseUrl + '/category-service/categories';
  public categories: Category[];
  public selectedCategory: Category;

  constructor(private http: HttpClient) {}

  /**
   * Returns all categories
   */
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl).pipe(catchError(this.handleError('getAllCategories', [])));
  }

  /**
   * Returns a specific category
   * @param id - id of the category to fetch
   */
  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(this.categoriesUrl + '/' + id).pipe(catchError(this.handleError<Category>('getCategory id=' + id)));
  }

  /**
   * Updates a category
   * @param category - the new version of the category
   */
  updateCategory(category: Category): Observable<Category> {
    return this.http
      .put<Category>(this.categoriesUrl + '/' + category.id, category)
      .pipe(catchError(this.handleError<Category>('putCategory id=' + category.id)));
  }

  /**
   * Creates a new Category
   * @param category - the new category
   */
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.categoriesUrl, category);
  }

  /**
   * Deletes a Category
   * @param category - category to delete
   */
  deleteCatgory(category: Category): Observable<Category> {
    return this.http.delete<Category>(this.categoriesUrl + '/' + category.id);
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
      // console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result);
    };
  }
}
