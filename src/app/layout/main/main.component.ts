import { Component } from '@angular/core';
import { ImprintComponent } from 'src/app/components/imprint/imprint.component';
import { MatDialog } from '@angular/material/dialog';
import { HelpComponent } from 'src/app/components/help/help.component';
import { ProfileComponent } from 'src/app/components/profile/profile.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  selectedOption: string = '1'; // Change toolbar-color
  isSidebarOpen = false;

  constructor(public dialog: MatDialog) {}


  openProfile() {
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


  onLogout() {}

}
