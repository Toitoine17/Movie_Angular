import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Film } from '../models/film.model';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private router: Router) { }

  getCurrentUserId(): string {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    return loggedInUserId ? loggedInUserId : '';
  }

  getLoggedInUserId(): string {
    const userId = localStorage.getItem('loggedInUserId');
    console.log('Logged in user ID:', userId);
    return userId || '';
  }

  login(email: string, password: string): Observable<any> {
    const credentials = { email, password };
    return this.http.post<any>('http://localhost:8000/api/login', credentials)
      .pipe(
        tap((response: any) => {
          localStorage.setItem('token', response.token); 
        }),
        catchError((error) => {
          console.error('Erreur lors de la connexion : ', error);
          throw error;
        })
      );
  }

  register(name: string, email: string, password: string): Observable<any> {
    const userData = { name, email, password }; 
    return this.http.post(`${this.apiUrl}/register`, userData)
      .pipe(
        catchError((error) => {
          console.error('Erreur lors de l\'inscription : ', error);
          throw error;
        })
      );
  }

  saveLoggedInUserId(token: string): void {
    localStorage.setItem('token', token);
  }

  logout(): void {
    localStorage.removeItem('loggedInUserId');
    this.router.navigate(['/login']);
  }
}
