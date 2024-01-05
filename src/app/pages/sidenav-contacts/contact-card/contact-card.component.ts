import { Component, OnInit } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts.service';
import { ContactClass } from 'src/app/models/contact.class';
import { ContactEditComponent } from '../contact-edit/contact-edit.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent  implements OnInit {
  selectedContact!: ContactClass | null;

  constructor(
    private contactService: ContactsService,
    private dialog: MatDialog,
    ) {}

  ngOnInit() {
    this.contactService.selectedContact$.subscribe((contact) => {
      this.selectedContact = contact;
    });
  }

  onEdit(): void {
    const dialogRef = this.dialog.open(ContactEditComponent, {
      data: { contact: this.selectedContact }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
