import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { FirebaseServiceService } from '../firebase-Service/firebase-service.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIcon,
    FormsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  user: User = new User();
  loading = false;
  registerUserData: any;
  UserAlreadyExists: boolean = false;
  constructor(public firebase: FirebaseServiceService, private router: Router) {

  }

  /**
   * This function checks if the new User already has an account with the used Email, if not, it saves all new userdata in the firebase database
   */
  async registerUser() {
    this.loading = true;
    let Emailexists = this.firebase.findUserWithEmail(this.user.email);
    if (await Emailexists) {
      console.log('Email vorhanden');
      this.UserAlreadyExists = true;
      setTimeout(()=>{
        this.UserAlreadyExists = false;
        this.router.navigate(['/']);
      },4000)
    } else {
      this.registerUserData = this.firebase.setUserObject(this.user);
      this.firebase.addUser(this.registerUserData);
      this.router.navigate(['/dashboard']);
    }
    this.loading = false;
  }

}