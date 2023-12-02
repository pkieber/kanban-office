import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactDialogComponent } from './contact-dialog/contact-dialog.component';
import { ContactClass } from 'src/app/models/contact.class';

@Component({
  selector: 'app-sidenav-contacts',
  templateUrl: './sidenav-contacts.component.html',
  styleUrls: ['./sidenav-contacts.component.scss']
})
export class SidenavContactsComponent {
  name!: string;
  email!: string;
  showFiller = false;


  constructor(public dialog: MatDialog) {}


  openDialogContact(): void {
    const dialogRef = this.dialog.open(ContactDialogComponent, {
      data: {name: this.name, email: this.email},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.name = result;
    });
  }


}


