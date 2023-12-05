import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactDialogComponent } from './contact-dialog/contact-dialog.component';
import { BreakpointObserver } from '@angular/cdk/layout';


@Component({
  selector: 'app-sidenav-contacts',
  templateUrl: './sidenav-contacts.component.html',
  styleUrls: ['./sidenav-contacts.component.scss']
})
export class SidenavContactsComponent {
  name!: string;
  email!: string;
  showFiller = false;


  constructor(
    public dialog: MatDialog,
    private breakpointObserver: BreakpointObserver
  ) {}


  // Condition for drawer.toggle()
  isMobile(): boolean {
    return this.breakpointObserver.isMatched('(max-width: 1200px)');
  }


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


