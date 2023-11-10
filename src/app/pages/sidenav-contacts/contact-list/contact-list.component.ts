import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.class';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contactList!: Observable<Array<Contact>>
  lastName!: string;
  firstName!: string;
  contactId!: string;

  constructor(private contactService: ContactsService) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts() {
    this.contactList = this.contactService.getAll();
  }

  onEdit(lastName: string, firstName: string, contactId: string) {
    this.lastName = lastName;
    this.firstName = firstName;
    this.contactId = contactId;
  }

  onDelete(contactId: string) {
    this.contactService.delete(contactId);
  }
}
