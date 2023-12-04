import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';
// import { ContactClass } from 'src/app/models/contact.class';
import { TasksService } from 'src/app/services/tasks.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sidenav-addtask',
  templateUrl: './sidenav-addtask.component.html',
  styleUrls: ['./sidenav-addtask.component.scss']
})
export class SidenavAddtaskComponent {
  // contact = new ContactClass();
  loading: boolean = false;
  taskForm: FormGroup; // reactive form
  minDate: Date;
  maxDate: Date;

  constructor(
    private taskService: TasksService,
    private snackBar: MatSnackBar,
  ) {
    this.taskForm = new FormGroup( {
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      category: new FormControl('', [Validators.required]),
      dueDate: new FormControl(null, Validators.required),
      assignment: new FormControl('', [Validators.required]),
    });

    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }


  async onSubmit() {
    if (this.taskForm.valid) {
      await this.addNewTask();
    } else {
      this.showSnackbar('Please fill in all required fields', 'error-snackbar');
    }
  }


  async addNewTask() {
    try {
      this.loading = true;
      const taskData = { ...this.taskForm.value, id: '' };
      await this.taskService.create(taskData);
      this.showSnackbar('Task added successfully', 'success-snackbar');
      // Reset the form after successfully adding a task
      this.taskForm.reset();
    } catch (error) {
      console.error(error);
      this.showSnackbar('Failed to add task', 'error-snackbar');
    } finally {
      this.loading = false;
    }
  }


  showSnackbar(message: string, panelClass: string = 'default-snackbar'): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: [panelClass]
    });
  }

}
