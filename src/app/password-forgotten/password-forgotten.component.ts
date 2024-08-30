import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FirebaseServiceService } from '../firebase-Service/firebase-service.service';

@Component({
  selector: 'app-password-forgotten',
  standalone: true,
  imports: [MatIconModule, FormsModule],
  templateUrl: './password-forgotten.component.html',
  styleUrl: './password-forgotten.component.scss'
})
export class PasswordForgottenComponent {

  email: string = '';

  constructor(public firebase: FirebaseServiceService){

  }

  async getEmailFromFirebase(){
    let emailExists = this.firebase.findUserWithEmail(this.email);
    console.log(await emailExists);
  }
  
}
