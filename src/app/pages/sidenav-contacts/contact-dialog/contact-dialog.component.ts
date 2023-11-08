import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/models/contact.class';
import { ContactsService } from 'src/app/services/contacts.service';
import { BoardDialogComponent } from '../../sidenav-board/board-dialog/board-dialog.component';

@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.scss']
})
export class ContactDialogComponent {
  contact$!: Observable<any>;


  constructor(
    private contactService: ContactsService,
    public dialogRef: MatDialogRef<BoardDialogComponent>
  ) {}

  async saveConcact() {
  }
}

