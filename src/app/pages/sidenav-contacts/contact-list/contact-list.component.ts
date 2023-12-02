import { Observable } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContactClass } from 'src/app/models/contact.class';
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

  contactList!: Observable<Array<ContactClass>>
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


  showContactDetail(contact: ContactClass) {
    this.contactService.setSelectedContact(contact);
  }


  /**
   * Avoid duplicate values in alphabet letters.
   * @param dataList
   * @returns
   */
  getUniqueInitials(dataList: any[]): string[] {
    const uniqueInitials: string[] = [];

    dataList.forEach((data) => {
      const initial = data.lastName[0].toUpperCase();
      if (!uniqueInitials.includes(initial)) {
        uniqueInitials.push(initial);
      }
    });

    return uniqueInitials;
  }
}
