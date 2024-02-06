import { Component } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { ContactsService } from 'src/app/services/contacts.service';
import { TaskClass } from 'src/app/models/task.class';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { COMMA, ENTER} from '@angular/cdk/keycodes';
import { inject } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';


@Component({
  selector: 'app-addtask-form',
  templateUrl: './addtask-form.component.html',
  styleUrl: './addtask-form.component.scss'
})
export class AddtaskFormComponent {
  loading: boolean = false;
  taskForm: FormGroup;
  // Due date
  minDate: Date;
  maxDate: Date;
  // Assignments
  //assignmentList: string[] = ['Person1', 'Person2', 'Person3', 'Person4', 'Person5', 'Person6'];
  assignmentList: string[] = [];
  // Subtasks
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  subtaskList: string[] = [];
  announcer = inject(LiveAnnouncer);


  constructor(
    private taskService: TasksService,
    private contactService: ContactsService,
    private snackBar: MatSnackBar,
  ) {
    this.loadAssignments();
    // Form group
    this.taskForm = new FormGroup( {
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      category: new FormControl('', [Validators.required]),
      dueDate: new FormControl(null, Validators.required),
      assignments: new FormControl('', [Validators.required]),
      priority: new FormControl('low'),
      subtasks: new FormArray([]),
      status: new FormControl('todo'),
    });
    // Due date
    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  loadAssignments() {
    this.contactService.getAll().subscribe(
      contacts => {
        this.assignmentList = contacts.map(contact => contact.firstName + ' ' + contact.lastName);
      },
      error => {
        console.error('Error loading assignments:', error);
        this.showSnackbar('Failed to load assignments', 'error-snackbar');
      }
    );
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
      this.updateSubtasksFormArray(); // Update the form array before submitting
      const taskData = { ...this.taskForm.value };
      // console.log('Task Data:', taskData);
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
      status: 'todo',
    });

    this.subtaskList = [];
  }


  showSnackbar(message: string, panelClass: string = 'default-snackbar'): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: [panelClass]
    });
  }


  // Subtasks
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add subtask
    if (value) {
      this.subtaskList.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }


  remove(subtask: string): void {
    const index = this.subtaskList.indexOf(subtask);

    if (index >= 0) {
      this.subtaskList.splice(index, 1);

      this.announcer.announce(`Removed ${subtask}`);
    }
  }


  updateSubtasksFormArray(): void {
    const subtasksArray = this.taskForm.get('subtasks') as FormArray;
    subtasksArray.clear(); // Clear the existing form array

    // Add each subtask from subtaskList to the form array
    this.subtaskList.forEach(subtask => {
      subtasksArray.push(new FormControl(subtask));
    });
  }

}
