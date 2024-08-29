import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from '../register/register.component';

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

  constructor(){

  }

  login(){
    console.log('test');
  }

  checkLogin(){
    if(this.email && this.password){
      this.loginPossible = true;
      console.log(this.loginPossible);  
    }else{
      this.loginPossible = false;
      console.log(this.loginPossible);
    }
  }

}
