import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email!: string;
  password!: string;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.email, this.password).subscribe(
      () => {
        console.log('Login successful');
        // Rediriger vers la page des films après une connexion réussie
        this.router.navigate(['/films']);
      },
      (error) => {
        console.error('Erreur lors de la connexion : ', error);
        this.errorMessage = 'Adresse e-mail ou mot de passe incorrect.';
      }
    );
  }
  
  encryptPassword(password: string): string {
    // Utiliser Bcrypt ou toute autre méthode appropriée pour encrypter le mot de passe
    // Exemple: return bcrypt.hashSync(password, saltRounds);
    return password;
  }
}
