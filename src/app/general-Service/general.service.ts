import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  passwordType: string = 'password';
  passwordDisplayed: boolean = false;

  constructor() { }

  /**
 * This function hide or displays the password.
 */
  showHidePassword() {
    if (this.passwordDisplayed) {
      this.passwordDisplayed = false;
      this.passwordType = 'password';
    } else {
      this.passwordDisplayed = true;
      this.passwordType = 'text';
    }
  }
}
