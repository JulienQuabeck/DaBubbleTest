import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-password-forgotten',
  standalone: true,
  imports: [MatIconModule, FormsModule],
  templateUrl: './password-forgotten.component.html',
  styleUrl: './password-forgotten.component.scss'
})
export class PasswordForgottenComponent {

  email: string = '';
  password: string = '';

}
