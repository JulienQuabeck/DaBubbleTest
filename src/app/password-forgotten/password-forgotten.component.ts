import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FirebaseServiceService } from '../firebase-Service/firebase-service.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-password-forgotten',
  standalone: true,
  imports: [MatIconModule, FormsModule, NgClass],
  templateUrl: './password-forgotten.component.html',
  styleUrl: './password-forgotten.component.scss'
})
export class PasswordForgottenComponent {

  email: string = '';
  name: string = '';
  nachname: string = '';
  password:string = '';
  repeatedPassword: string = '';
  buttonDisabled: boolean = true;
  MailInputDisabled: boolean = false;
  nameInputDisabled: boolean = false;
  nachnameInputDisabled: boolean = false;
  displayfurtherQuestions: boolean = false;
  displayfurtherQuestions2: boolean = false;
  displayNewPasswordInputs: boolean = false;

  constructor(public firebase: FirebaseServiceService) {

  }

  /**
   * This functions checks, if the email exists, if so it displays the next questions for changing the password
   */
  async getEmailFromFirebase() {
    if (!this.buttonDisabled) {
      let emailExists = this.firebase.findUserWithEmail(this.email);
      if(await emailExists){
        this.displayfurtherQuestions = true;
        this.disableMailInput();
        this.buttonDisabled = true;
      }else{
        this.displayfurtherQuestions = false;
      }
    }
  }

/**
 * This function checks, if an input-Element is empty or not. If it is empty it sets the var "buttonDisabled" to true, sothat the button is disabled
 * @param inputvalue id of the input-Element
 */
  checkInput(inputvalue:string) {
    if(inputvalue.trim().length === 0){
      this.buttonDisabled = true;
    }else{
      this.buttonDisabled = false;    
    }
  }

  /**
   * This function sets the MailInputDisabled Variable to true, so that the input for the mail adress will be disabled.
   */
  disableMailInput(){
    this.MailInputDisabled = true;
  }

  /**
   * This function sets the displayfurtherQuestions2 Variable to true
   */
  displayNachnameInput(){
    this.nameInputDisabled = true;
    this.displayfurtherQuestions2 = true;
  }

    /**
   * This function sets the displayPasswortInputs variable to true
   */
  displayPasswortInputs(){
    this.nachnameInputDisabled = true;
    this.displayNewPasswordInputs = true;
  }

  updatePassword(){
    
  }

}
