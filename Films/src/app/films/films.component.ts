import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Film } from '../models/film.model';
import { FilmsService } from '../services/films.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  films: Film[] = [];
  filmForm!: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private filmsService: FilmsService) { }

  ngOnInit(): void {
    this.initFilmForm();
  }

  initFilmForm(): void {
    this.filmForm = this.fb.group({
      title: ['', Validators.required], // Ajoutez les autres champs du formulaire ici
      director: ['', Validators.required],
      year: ['', [Validators.required, Validators.pattern('[0-9]{4}')]],
      synopsis: ['', Validators.required],
      user_id: [''] // L'utilisateur doit être connecté pour que cet ID soit défini
    });
  }

  addFilm(): void {
    if (this.filmForm.valid) {
      const newFilm: Film = this.filmForm.value;
  
      this.filmsService.createFilm(newFilm).subscribe(
        (response: Film) => {
          this.films.push(response);
          this.filmForm.reset();
        },
        (error: HttpErrorResponse) => {
          console.error('Erreur lors de l\'ajout du film : ', error);
          if (error.status === 404) {
            this.errorMessage = 'Erreur : Route introuvable';
          } else {
            this.errorMessage = 'Erreur lors de l\'ajout du film';
          }
        }
      );
    } else {
      console.error('Le formulaire est invalide');
      this.errorMessage = 'Le formulaire est invalide';
    }
  }
}
