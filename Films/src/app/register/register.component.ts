import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup; // Utilisation du signe d'exclamation pour indiquer que la propriété sera initialisée dans le constructeur
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      this.errorMessage = "Les mots de passe ne correspondent pas.";
      return;
    }

    this.authService.register(this.registerForm.value.name, this.registerForm.value.email, this.registerForm.value.password).subscribe(
      () => {
        // Redirection vers la page de connexion après l'inscription réussie
        this.router.navigate(['/login']);
      },
      error => {
        this.errorMessage = "Une erreur s'est produite lors de l'inscription. Veuillez réessayer.";
      }
    );
  }
}
