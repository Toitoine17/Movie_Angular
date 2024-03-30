import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmsComponent } from '../app/films/films.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'; // Importez le composant d'inscription

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'films', component: FilmsComponent },
  { path: 'register', component: RegisterComponent }, // Ajoutez la route vers le composant d'inscription
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
