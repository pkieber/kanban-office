import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { Contact } from 'src/app/models/contact.class';
import { ContactsService } from 'src/app/services/contacts.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.scss']
})
export class ContactDialogComponent {
  contact = new Contact();
  loading = false;

  userForm = new FormGroup( {
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
  })



  constructor(
    private contactService: ContactsService,
    public dialogRef: MatDialogRef<ContactDialogComponent>
  ) {}

  async saveConcact() {
    this.loading = true;

  }

  onSubmit() {
    if(this.userForm.valid) {
      console.log(this.userForm.value);
      this.userForm.reset();
    }
  }
}

