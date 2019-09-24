import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.baseUrl;
  private authUrl = this.baseUrl + '/uaa/';
  private accountUrl = this.baseUrl + '/account-service/';
  loggedIn = false;
  redirectUrl: string;

  constructor(private http: HttpClient, private router: Router) {}

  login(data: any): Observable<any> {
    let params = new URLSearchParams();
    params.append('username', data.username);
    params.append('password', data.password);
    params.append('grant_type', 'password');
    let headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: 'Basic YnJvd3NlcjoxMjM0'
    });

    return this.http.post<any>(this.authUrl + 'oauth/token', params.toString(), { headers: headers }).pipe(
      tap(_ => (this.loggedIn = true)),
      catchError(this.handleError('login', []))
    );
  }

  logout(): Observable<any> {
    localStorage.removeItem('token');
    this.router.navigate(['login']);

    return this.http.get<any>(this.authUrl + 'signout').pipe(
      tap(_ => (this.loggedIn = false)),
      catchError(this.handleError('logout', []))
    );
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(this.accountUrl + 'accounts', data).pipe(
      tap(_ => this.log('login')),
      catchError(this.handleError('login', []))
    );
  }

  public isLoggedIn(): boolean {
    return this.loggedIn;
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
