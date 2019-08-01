import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.baseUrl;
  private authUrl = this.baseUrl + '/auth/';
  isLoggedIn = false;
  redirectUrl: string;

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post<any>(this.authUrl + 'login', data).pipe(
      tap(_ => (this.isLoggedIn = true)),
      catchError(this.handleError('login', []))
    );
  }

  logout(): Observable<any> {
    return this.http.get<any>(this.authUrl + 'signout').pipe(
      tap(_ => (this.isLoggedIn = false)),
      catchError(this.handleError('logout', []))
    );
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(this.authUrl + 'register', data).pipe(
      tap(_ => this.log('login')),
      catchError(this.handleError('login', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
