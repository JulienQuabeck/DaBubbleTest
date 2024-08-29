import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { FirebaseServiceService } from '../firebase-Service/firebase-service.service';

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
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  user:User = new User();
  loading = false;
  registerUserData:any;

  constructor(public firebase: FirebaseServiceService){

  }

  registerUser(){
    console.log(this.user);
    this.loading = true;
    this.registerUserData = this.firebase.setUserObject(this.user);  
    this.firebase.addUser(this.registerUserData);  
    this.loading = false;
  }

}
