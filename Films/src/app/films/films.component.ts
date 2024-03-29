import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Film } from '../models/film.model';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  films: Film[] = [];
  filmForm!: FormGroup; 

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initFilmForm();
 
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

  deleteFilm(index: number): void {
    this.films.splice(index, 1); 
  }
}
