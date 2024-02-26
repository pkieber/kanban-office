import { Component, HostBinding, OnInit, computed, inject, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatDialog } from '@angular/material/dialog';
import { ImprintComponent } from 'src/app/components/imprint/imprint.component';
import { HelpComponent } from 'src/app/components/help/help.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  snackbar = inject(MatSnackBar);

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

    this.authService.user$.subscribe((user) => {
      if (user) {
        this.authService.currentUserSig.set({
          email: user.email!,
          username: user.displayName!,
        });
      } else {
        this.authService.currentUserSig.set(null);
      }
      //console.log(this.authService.currentUserSig());
    });
  }


  onLogout(): void {
    this.showSnackbar('User logout successfull', 'success-snackbar');
    this.authService.logout();
    //console.log('logout');
    this.router.navigateByUrl('/login');
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

  showSnackbar(message: string, panelClass: string = 'default-snackbar'): void {
    this.snackbar.open(message, 'OK', {
      duration: 3000,
      panelClass: [panelClass]
    });
  }

}
