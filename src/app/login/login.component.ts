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
import { PasswordForgottenComponent } from '../password-forgotten/password-forgotten.component';
import { GeneralService } from '../general-Service/general.service';


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
    RegisterComponent,
    PasswordForgottenComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  loginPossible: boolean = false;
  emailOrPasswordWrong: boolean = false;
  id: string = '';
  name: string = '';
  nachname: string = '';

  constructor(public firebase: FirebaseServiceService, private router: Router, public generalService: GeneralService) { }

  /**
   * This function checks, if the entered email-adress is saved in the firebase database, if so, it checks the entered password with the saved one for the entered email.
   * If both exists and is correct, the user will be moved to the dashboard, if not an error will be displayed
   */
  async login() {
    let emailExists = this.firebase.findUserWithEmail(this.email)
    if (await emailExists) {
      let passwordVerified = await this.firebase.verifyPassword(this.email, this.password);
      if (passwordVerified) {
        let id = await this.getParams();
        // hier muss eingebaut werden, dass die id der name und der nachname des users abgerufen wird, und dann mit zum dashboard übergeben wird.
        this.router.navigate(['/dashboard', id]);
        // this.router.navigate(['/dashboard']);
      } else {
        this.setTimeoutForErrorMessage();
      }
    } else {
      this.setTimeoutForErrorMessage();
    }
    this.email = '';
    this.password = '';
  }

  /**
   * This function pulls the user id out of the firebase database to send it to the dashboard after login
   * @returns 
   */
  async getParams(){
    let id = await this.firebase.getUserId(this.email);
    return id;
  }

  /**
   * This function toggles the emailOrPasswordWrong boolean to display an error message
   */
  setTimeoutForErrorMessage() {
    this.emailOrPasswordWrong = true;
    setTimeout(() => {
      this.emailOrPasswordWrong = false;
    }, 4000);
  }

  /**
 * This function refers to the showHidePassword-Funktion of the general Service
 */
  showHidePassword() {
    this.generalService.showHidePassword();
  }
}