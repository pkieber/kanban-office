import { Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';


export type MenuItem = {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-custom-mobilenav',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './custom-mobilenav.component.html',
  styleUrl: './custom-mobilenav.component.scss'
})
export class CustomeMobilenavComponent {


  menuItems = signal<MenuItem[]>([
    {
      icon: 'table_chart',
      label: 'Summary',
      route: 'summary',
    },
    {
      icon: 'dashboard_customize',
      label: 'Board',
      route: 'board',
    },
    {
      icon: 'task',
      label: 'Tasks',
      route: 'tasks',
    },
    {
      icon: 'group',
      label: 'Contacts',
      route: 'contacts',
    },
  ]);

}
