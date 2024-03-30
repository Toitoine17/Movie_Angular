import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email!: string;
  password!: string;
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  login() {
    const encryptedPassword = this.encryptPassword(this.password);
    const credentials = { email: this.email, password: encryptedPassword };
    this.http.post('http://localhost:8000/api/login', credentials)
      .subscribe(
        (response: any) => {
          console.log('Login successful:', response);
          // Redirection vers la page des films
          this.router.navigate(['/films']);
        },
        error => {
          console.error('Login error:', error);
          // Affichage du message d'erreur
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
