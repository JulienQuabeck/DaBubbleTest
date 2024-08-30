import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from '../register/register.component';
import { FirebaseServiceService } from '../firebase-Service/firebase-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    DashboardComponent,
    FormsModule,
    RegisterComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  loginPossible: boolean = false;
  emailOrPasswordWrong: boolean = false;

  constructor(public firebase: FirebaseServiceService, private router: Router) {

  }

  async login() {
    let emailExists = this.firebase.findUserWithEmail(this.email)    
    if (await emailExists) {
      let passwordVerified = await this.firebase.verifyPassword(this.email, this.password);      
      if(passwordVerified){
        this.router.navigate(['/dashboard']);
      }else{
        this.emailOrPasswordWrong = true;
        setTimeout( ()=> {
          this.emailOrPasswordWrong = false;
        },4000);
      }
    } else {
      this.emailOrPasswordWrong = true;
      setTimeout( ()=> {
        this.emailOrPasswordWrong = false;
      },4000);

    }
    this.email = '';
    this.password = '';
  }
}