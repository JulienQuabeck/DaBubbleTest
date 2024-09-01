import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { PasswordForgottenComponent } from './password-forgotten/password-forgotten.component';

export const routes: Routes = [
    {path: "", component: LoginComponent},
    {path: "register", component: RegisterComponent},
    {path: "dashboard/:id", component: DashboardComponent},
    {path: "passwortForgotten", component: PasswordForgottenComponent}
];
