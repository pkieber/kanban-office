import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OnInit, Inject, Component } from '@angular/core';

@Component({
  selector: 'app-base-task-form',
  template: '',
})
export abstract class BaseTaskFormComponent implements OnInit {
  loading: boolean = false;
  taskForm!: FormGroup;

  constructor(
    // Include other dependencies as needed
    public dialogRef: MatDialogRef<any>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  abstract initializeForm(): void;

  async onSave() {
    if (this.taskForm.valid) {
      await this.updateOrAddTask();
    } else {
      this.showSnackbar('Please fill in all required fields', 'error-snackbar');
    }
  }

  abstract updateOrAddTask(): Promise<void>;

  onCancel() {
    this.dialogRef.close();
  }

  showSnackbar(message: string, panelClass: string = 'default-snackbar'): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: [panelClass]
    });
  }
}
