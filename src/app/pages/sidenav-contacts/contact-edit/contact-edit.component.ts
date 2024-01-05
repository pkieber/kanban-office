import { MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactClass } from 'src/app/models/contact.class';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.scss'
})
export class ContactEditComponent {
  loading: boolean = false;
  editContactForm: FormGroup;
  selectedContact: ContactClass = new ContactClass();

  constructor(
    private contactService: ContactsService,
    public dialogRef: MatDialogRef<ContactEditComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any // Inject data from the parent component
  ) {
    this.editContactForm = new FormGroup({
      firstName: new FormControl(data.contact.firstName, Validators.required),
      lastName: new FormControl(data.contact.lastName, Validators.required),
      email: new FormControl(data.contact.email, [Validators.required, Validators.email]),
      phone: new FormControl(data.contact.phone, Validators.required),
      team: new FormControl(data.contact.team, Validators.required),
      color: new FormControl(data.contact.color),
    });
  }

  async onSave() {
    if (this.editContactForm.valid) {
      await this.updateContact();
    } else {
      this.showSnackbar('Please fill in all required fields', 'error-snackbar');
    }
  }

  async updateContact() {
    try {
      this.loading = true;
      const updatedContactData = { ...this.editContactForm.value, id: this.data.contact.id };
      await this.contactService.update(updatedContactData);
      this.showSnackbar('Contact updated successfully', 'success-snackbar');
    } catch (error) {
      console.error(error);
      this.showSnackbar('Failed to update contact', 'error-snackbar');
    } finally {
      this.loading = false;
      this.dialogRef.close();
    }
  }

  onCancel() {
    // Handle cancellation if needed
    this.dialogRef.close();
  }

  showSnackbar(message: string, panelClass: string = 'default-snackbar'): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: [panelClass]
    });
  }
}
