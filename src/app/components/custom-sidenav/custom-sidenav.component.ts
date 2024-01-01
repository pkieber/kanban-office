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
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.scss'
})
export class CustomSidenavComponent {

  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }

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


  // Adjusting profilePicSize calculation inside the class
  logoPicSize = computed(() => this.sideNavCollapsed() ? '50' : '120' );

}
