import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Film } from '../models/film.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  films: Film[] = [];
  filmForm!: FormGroup; 

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.initFilmForm();
  }
  
  logout(): void {
    this.authService.logout();
  }

  initFilmForm(): void {
    this.filmForm = this.fb.group({
      name: ['', Validators.required],
      realisateur: ['', Validators.required],
      annee: ['', [Validators.required, Validators.pattern('[0-9]{4}')]],
      synopsis: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.filmForm.valid) {
      const newFilm: Film = this.filmForm.value;
      this.films.push(newFilm);
      this.filmForm.reset();
    }
  }

  editFilm(index: number): void {
    this.films[index].editMode = true;
  }

  confirmModification(film: Film): void {
    film.editMode = false;
  }

  cancelEdit(film: Film): void {
    film.editMode = false;
  }
  deleteFilm(index: number): void {
    this.films.splice(index, 1);
  }
}
