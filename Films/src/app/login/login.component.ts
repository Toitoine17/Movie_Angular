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

  constructor(private http: HttpClient, private router: Router) { }

  onSubmit() {
    // Ajoutez ici la logique de soumission du formulaire
    console.log('Formulaire soumis !');
  }

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
          // Handle login error
        }
      );
  }

  encryptPassword(password: string): string {
    // Use Bcrypt or any appropriate method to encrypt the password
    // Example: return bcrypt.hashSync(password, saltRounds);
    return password;
  }
}
