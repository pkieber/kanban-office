import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { ContactClass } from 'src/app/models/contact.class';
import { ContactsService } from 'src/app/services/contacts.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.scss']
})
export class ContactDialogComponent {
  contact = new ContactClass();
  loading = false;

  userForm = new FormGroup( {
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    team: new FormControl('', Validators.required),
    color: new FormControl(''),
  })



  constructor(
    private contactService: ContactsService,
    public dialogRef: MatDialogRef<ContactDialogComponent>,
    private snackBar: MatSnackBar,
  ) {}

  onSubmit() {
    if(this.userForm.valid) {
      this.loading = true;
      console.log(this.userForm.value);
      this.userForm.reset();
      this.showSnackbar('Contact added successfully', 'success-snackbar');
    }
  }

  showSnackbar(message: string, panelClass: string = 'default-snackbar'): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: [panelClass]
    });
  }

}


