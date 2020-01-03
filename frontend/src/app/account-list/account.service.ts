import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Account } from '../models/account';

@Injectable()
export class AccountService {
  private baseUrl = environment.baseUrl;
  private accountsUrl = this.baseUrl + '/bank-account-service/accounts';
  public accounts: Account[];

  constructor(private http: HttpClient) {}

  /**
   * Returns all accounts
   */
  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.accountsUrl).pipe(catchError(this.handleError('getAllAccounts', [])));
  }

  /**
   * Returns a specific account
   * @param id - id of the account to fetch
   */
  getAccountById(id: number): Observable<Account> {
    return this.http.get<Account>(this.accountsUrl + '/' + id).pipe(catchError(this.handleError<Account>('getAccount id=' + id)));
  }

  /**
   * Updates a account
   * @param account - the new version of the account
   */
  updateAccount(account: Account): Observable<Account> {
    return this.http
      .put<Account>(this.accountsUrl + '/' + account.id, account)
      .pipe(catchError(this.handleError<Account>('putAccount id=' + account.id)));
  }

  /**
   * Creates an new Account
   * @param account - the new account
   */
  createAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.accountsUrl, account);
  }

  /**
   * Deletes an Account
   * @param account - account to delete
   */
  deleteAccount(account: Account): Observable<Account> {
    return this.http.delete<Account>(this.accountsUrl + '/' + account.id);
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
