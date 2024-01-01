import { Component, HostBinding, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CustomSidenavComponent } from "./components/custom-sidenav/custom-sidenav.component";
import { CustomeMobilenavComponent } from './components/custom-mobilenav/custom-mobilenav.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { ProfileComponent } from './components/profile/profile.component';
import { ImprintComponent } from './components/imprint/imprint.component';
import { HelpComponent } from './components/help/help.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  collapsed = signal(false);

  // Dark- and light-mode settings
  switchTheme = new FormControl(false);
  @HostBinding('class') className = ''
  darkClassName = 'theme-dark';
  lightClassName = 'theme-light';

  // Adjusting sidenav-width calculation inside the class
  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px');


  constructor(
    private overlay: OverlayContainer,
    public dialog: MatDialog,
  ) {}


  ngOnInit(): void {
    this.switchTheme.valueChanges.subscribe((darkMode) => {
      this.className = darkMode ? this.darkClassName : this.lightClassName;
      if(darkMode) {
        this.overlay.getContainerElement().classList.add(this.darkClassName);
      } else {
        this.overlay.getContainerElement().classList.remove(this.darkClassName);
      }
    })
  }


  onLogout() {}


  openDialogProfile() {
    const dialogRef = this.dialog.open(ProfileComponent);
    dialogRef.afterClosed().subscribe(result => {
    });
  }


  openDialogLegal() {
    const dialogRef = this.dialog.open(ImprintComponent);
    dialogRef.afterClosed().subscribe(result => {
    });
  }


  openDialogHelp() {
    const dialogRef = this.dialog.open(HelpComponent);
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
