import { Component, OnInit } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts.service';
import { Contact } from 'src/app/models/contact.class';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent  implements OnInit {
  selectedContact!: Contact | null;

  constructor(private contactService: ContactsService) {}

  ngOnInit() {
    this.contactService.selectedContact$.subscribe((contact) => {
      this.selectedContact = contact;
    });
  }
}
