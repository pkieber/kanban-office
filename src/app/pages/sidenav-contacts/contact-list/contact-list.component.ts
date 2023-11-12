import { Observable } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from 'src/app/models/contact.class';
import { ContactsService } from 'src/app/services/contacts.service';
import { AlphabeticalSortPipe } from 'src/app/alphabetical-sort.pipe';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  @Input() contactData: any; // Input property to receive contact data
  @Output() showDetail = new EventEmitter<any>(); // Output event emitter

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


  showContactDetail(contact: Contact) {
    this.contactService.setSelectedContact(contact);
  }
}
