import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FirebaseServiceService } from '../firebase-Service/firebase-service.service';
import { NgClass } from '@angular/common';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-password-forgotten',
  standalone: true,
  imports: [MatIconModule, FormsModule, NgClass],
  templateUrl: './password-forgotten.component.html',
  styleUrl: './password-forgotten.component.scss'
})
export class PasswordForgottenComponent {

  userId: string = '';
  email: string = '';
  name: string = '';
  nachname: string = '';
  password: string = '';
  repeatedPassword: string = '';
  buttonDisabled: boolean = true;
  MailInputDisabled: boolean = false;
  nameInputDisabled: boolean = false;
  nachnameInputDisabled: boolean = false;
  displayfurtherQuestions: boolean = false;
  displayfurtherQuestions2: boolean = false;
  displayNewPasswordInputs: boolean = false;
  displayError: boolean = false;
  ErrorMessage: string = '';

  constructor(public firebase: FirebaseServiceService) {

  }

  /**
   * This functions checks, if the email exists, if so it displays the next questions for changing the password
   */
  async getEmailFromFirebase() {
    if (!this.buttonDisabled) {
      let emailExists = this.firebase.findUserWithEmail(this.email);
      if (await emailExists) {
        this.displayfurtherQuestions = true;
        this.disableMailInput();
        this.buttonDisabled = true; 
        this.saveUserId();    
      } else {
        this.displayfurtherQuestions = false;
        this.toggleDisplayError();
        this.ErrorMessage = 'Es wurde kein Account mit der eingegebenen E-Mail Adresse gefunden!';
        this.email = '';
      }
    }
  }

  /**
   * This function saves the userId for the user who is changing its password
   */
  async saveUserId(){
    this.userId = await this.firebase.getUserId(this.email);   
  }

  /**
   * This function checks, if an input-Element is empty or not. If it is empty it sets the var "buttonDisabled" to true, sothat the button is disabled
   * @param inputvalue id of the input-Element
   */
  checkInput(inputvalue: string) {
    if (inputvalue.trim().length === 0) {
      this.buttonDisabled = true;
    } else {
      this.buttonDisabled = false;
    }
  }

  /**
   * This function sets the MailInputDisabled Variable to true, so that the input for the mail adress will be disabled.
   */
  disableMailInput() {
    this.MailInputDisabled = true;
  }

  /**
   * This function checks, if the written name is similar to the saved on in the firebase database
   */
  async getNameFromFirebase() {
    let nameFromFirebase = this.firebase.getName(this.name);
    if (await nameFromFirebase == this.name) {
      this.displayNachnameInput();
    } else {
      this.toggleDisplayError();
      this.ErrorMessage = 'Der eingegebene Name stimmt nicht mit dem zu diesem Account hinterlegten Namen überein!';
      this.name = '';
    }
  }

  /**
   * This function sets the displayfurtherQuestions2 Variable to true
   */
  displayNachnameInput() {
    this.nameInputDisabled = true;
    this.displayfurtherQuestions2 = true;
  }

  /**
 * This function checks, if the written "Nachname" (=lastname) is similar to the saved on in the firebase database
 */
  async getnachnameFromFirebase() {
    let nachnameFromFirebase = this.firebase.getNachname(this.nachname);
    if (await nachnameFromFirebase == this.nachname) {
      this.displayPasswortInputs();
    } else {
      this.toggleDisplayError();
      this.ErrorMessage = 'Der eingegebene Nachname stimmt nicht mit dem zu diesem Account hinterlegten Nachnamen überein!';
      this.nachname = '';
    }
  }

  /**
 * This function sets the displayPasswortInputs variable to true
 */
  displayPasswortInputs() {
    this.nachnameInputDisabled = true;
    this.displayNewPasswordInputs = true;
  }

  /**
   * This function updates the user password in the firebase database
   */
  updatePassword() {
    if (this.password === this.repeatedPassword) {
      // Update Passwort
    } else {
      this.toggleDisplayError();
      this.ErrorMessage = 'Die eingegebenen Passwörter stimmen nicht überein!';
      this.password = '';
      this.repeatedPassword = '';
    }
  }

  /**
   * This function toggles a variable to display an Error-Message for 4 seconds
   */
  toggleDisplayError() {
    this.displayError = true;
    setTimeout(() => {
      this.displayError = false;
    }, 4000);
  }

}
