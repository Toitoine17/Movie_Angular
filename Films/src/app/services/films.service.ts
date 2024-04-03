import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Film } from '../models/film.model';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {
  private apiUrl = 'http://localhost:8000/api/films';

  constructor(private http: HttpClient) { }

  getFilms(): Observable<Film[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.get<Film[]>(this.apiUrl, { headers: headers });
  }
  createFilm(film: Film): Observable<Film> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post<Film>(this.apiUrl, film, { headers: headers });
  }
  updateFilm(film: Film): Observable<Film> {
    const url = `${this.apiUrl}/${film.id}`;
    return this.http.put<Film>(url, film);
  }

  deleteFilm(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}