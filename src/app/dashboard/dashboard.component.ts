import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardHeaderComponent } from '../dashboard-header/dashboard-header.component';
import { DashboardChannelsComponent } from '../dashboard-channels/dashboard-channels.component';
import { DashboardChatComponent } from '../dashboard-chat/dashboard-chat.component';
import { DashboardThreadComponent } from '../dashboard-thread/dashboard-thread.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, DashboardHeaderComponent, DashboardChannelsComponent, DashboardChatComponent, DashboardThreadComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
