import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';
// import { ContactClass } from 'src/app/models/contact.class';
import { ContactsService } from 'src/app/services/contacts.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-contact-form',
  templateUrl: './add-contact-form.component.html',
  styleUrl: './add-contact-form.component.scss'
})
export class AddContactFormComponent {
// contact = new ContactClass();
loading: boolean = false;
userForm: FormGroup; // reactive form

constructor(
  private contactService: ContactsService,
  public dialogRef: MatDialogRef<AddContactFormComponent>,
  private snackBar: MatSnackBar,
) {
  this.userForm = new FormGroup( {
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    team: new FormControl('', Validators.required),
    color: new FormControl(''),
  });
}


async onSubmit() {
  if (this.userForm.valid) {
    await this.addNewContact();
  } else {
    this.showSnackbar('Please fill in all required fields', 'error-snackbar');
  }
}


async addNewContact() {
  try {
    this.loading = true;
    const contactData = { ...this.userForm.value, id: '' };
    await this.contactService.create(contactData);
    this.showSnackbar('Contact added successfully', 'success-snackbar');
  } catch (error) {
    console.error(error);
    this.showSnackbar('Failed to add contact', 'error-snackbar');
  } finally {
    this.loading = false;
    this.dialogRef.close();
  }
}



showSnackbar(message: string, panelClass: string = 'default-snackbar'): void {
  this.snackBar.open(message, 'OK', {
    duration: 3000,
    panelClass: [panelClass]
  });
}

}


