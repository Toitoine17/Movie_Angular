import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Film } from '../models/film.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';
  getFilmsByUserId(): Observable<Film[]> {
 
    const userId = this.getLoggedInUserId(); 
    return this.http.get<Film[]>(`http://localhost:8000/api/users/${userId}/films`);
  }
  getCurrentUserId(): any {
    throw new Error('Method not implemented.');
  }

  getLoggedInUserId(): string {
  
    return localStorage.getItem('loggedInUserId') || '';
  }


  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    const body = { email, password };
    return this.http.post<any>('http://localhost:8000/api/login', body);
  }

  register(name: string, email: string, password: string): Observable<any> {
    const userData = { name, email, password }; 
    return this.http.post(`${this.apiUrl}/register`, userData)
      .pipe(
        catchError((error) => {
          // Gérer l'erreur ici, par exemple afficher un message d'erreur
          console.error('Erreur lors de l\'inscription : ', error);
          throw error; // Rejeter l'erreur pour que le composant puisse la gérer également
        })
      );
  }
 logout() {
    // Supprimer l'ID de l'utilisateur connecté du stockage local
    localStorage.removeItem('loggedInUserId');
    
    // Rediriger l'utilisateur vers la page d'authentification
    this.router.navigate(['/login']);
  }
}
