import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatCardModule, MatInputModule, MatDividerModule, MatButtonModule, DashboardComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
