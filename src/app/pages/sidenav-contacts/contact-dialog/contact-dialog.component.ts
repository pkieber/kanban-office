import { Component } from '@angular/core';
import { Contact } from 'src/app/models/contact.class';
import { MatDialogRef } from '@angular/material/dialog';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.scss']
})
export class ContactDialogComponent {
  contact = new Contact();
  loading = false;



  constructor(
    private contactService: ContactsService,
    public dialogRef: MatDialogRef<ContactDialogComponent>
  ) {}

  async saveConcact() {
    this.loading = true;

  }
}

