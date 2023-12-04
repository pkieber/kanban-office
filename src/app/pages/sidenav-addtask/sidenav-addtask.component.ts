import { Component } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sidenav-addtask',
  templateUrl: './sidenav-addtask.component.html',
  styleUrls: ['./sidenav-addtask.component.scss']
})
export class SidenavAddtaskComponent {
  loading: boolean = false;
  taskForm: FormGroup; // reactive form
  minDate: Date;
  maxDate: Date;
  assignmentList: string[] = ['Person1', 'Person2', 'Person3', 'Person4', 'Person5', 'Person6'];

  constructor(
    private taskService: TasksService,
    private snackBar: MatSnackBar,
  ) {
    this.taskForm = new FormGroup( {
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      category: new FormControl('', [Validators.required]),
      dueDate: new FormControl(null, Validators.required),
      assignments: new FormControl('', [Validators.required]),
      priority: new FormControl('low'),
      subtasks: new FormControl('', [Validators.required]),
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
      // const taskData = { ...this.taskForm.value, id: '' };
      const taskData = { ...this.taskForm.value };
      console.log('Task Data:', taskData);
      await this.taskService.create(taskData);
      this.showSnackbar('Task added successfully', 'success-snackbar');
      this.resetForm();

    } catch (error) {
      console.error(error);
      this.showSnackbar('Failed to add task', 'error-snackbar');

    } finally {
      this.loading = false;
    }
  }


  // Function to reset the entire form with default values
  resetForm() {
    this.taskForm.reset({
      title: '',
      description: '',
      category: '',
      assignments: '',
      dueDate: null,
      priority: 'low',
      subtasks: '',
    });
  }


  showSnackbar(message: string, panelClass: string = 'default-snackbar'): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: [panelClass]
    });
  }

}
