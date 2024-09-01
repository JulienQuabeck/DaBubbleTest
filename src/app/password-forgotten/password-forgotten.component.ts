import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FirebaseServiceService } from '../firebase-Service/firebase-service.service';
import { NgClass } from '@angular/common';
import { User } from '../../models/user.class';
import { Router } from '@angular/router';
import { GeneralService } from '../general-Service/general.service';

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
  user:User = {
    id: this.userId,
    email: this.email,
    name: this.name,
    nachname: this.nachname,
    passwort: this.password
  }

  constructor(public firebase: FirebaseServiceService, private router: Router, public generalService: GeneralService) {

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
      let user = this.createUser();
      this.firebase.updatePasswort(user);
      this.ErrorMessage = "Ihr Passwort wurde erfolgreich geändert!";
      this.toggleDisplayError();
      setTimeout(()=>{
        this.router.navigate(['/']);
      },4000);
    } else {
      this.toggleDisplayError();
      this.ErrorMessage = 'Die eingegebenen Passwörter stimmen nicht überein!';
      this.password = '';
      this.repeatedPassword = '';
    }
  }

  /**
   * This function creates a new user with the new password
   * @returns a User with the new password
   */
  createUser(){
    let user= {
      id: this.userId,
      email: this.email,
      name: this.name,
      nachname: this.nachname,
      passwort: this.password
    }
    return user;
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

  /**
   * This function refers to the showHidePassword-Funktion of the general Service
   */
  showHidePassword(){
    this.generalService.showHidePassword();
  }

}
