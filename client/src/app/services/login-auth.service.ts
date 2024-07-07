import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginAuthService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:4000';

  signup(username: string, password: string): Observable<any> {
    const data = {
      username: username,
      password: password,
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/signup`, data, { headers });
  }

  login(username: string, password: string): Observable<any> {
    const data = { username, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${this.apiUrl}/login`, data, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred!';
        if (error.status === 404) {
          errorMessage = 'Username doesn\'t exist';
        } else if (error.status === 401) {
          errorMessage = 'Incorrect password';
        } else if (error.status === 500) {
          errorMessage = 'Internal server error';
        }
        return throwError(errorMessage);
      })
    );
  }
}
