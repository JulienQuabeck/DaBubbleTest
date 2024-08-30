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
import { FirebaseServiceService } from '../firebase-Service/firebase-service.service';
import { getDocs } from 'firebase/firestore';

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

  constructor(public firebase: FirebaseServiceService) {

  }

  async login() {
    console.log(this.email, this.password);
    // let j = this.numberOfRegisteredUsers();
    // for(let i = 0; i < await j; i++){
    //   console.log(i);
    // }
    this.email = '';
    this.password = '';
  }

  // async numberOfRegisteredUsers() {
  //   try {
  //     const querySnapshot = await getDocs(this.firebase.getUserRef());
  //     return querySnapshot.size;  // Returns the number of documents in the collection

  //   } catch (err) {
  //     console.error("Error getting document count: ", err);
  //     return 0;
  //   }
  // }


  checkLogin() {
    if (this.email && this.password) {
      this.loginPossible = true;
      console.log(this.loginPossible);
    } else {
      this.loginPossible = false;
      console.log(this.loginPossible);
    }
  }

}
