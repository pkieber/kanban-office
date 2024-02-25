import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-delete-confirm',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './dialog-delete-confirm.component.html',
  styleUrl: './dialog-delete-confirm.component.scss'
})
export class DialogDeleteConfirmComponent {

}
