import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskClass } from 'src/app/models/task.class';
import { TasksService } from 'src/app/services/tasks.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { inject } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';

export interface SubtaskClass {
  name: string;
}

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.scss'],
})
export class EditTaskDialogComponent implements OnInit {
  private backupTask: Partial<TaskClass> = { ...this.data.task };
  loading: boolean = false;
  taskForm!: FormGroup;
  selectedTask: TaskClass = {} as TaskClass;

  // Due date
  minDate!: Date;
  maxDate!: Date;
  // Assignments
  assignmentList: string[] = ['Person1', 'Person2', 'Person3', 'Person4', 'Person5', 'Person6'];
  // Subtasks
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  subtaskList: SubtaskClass[] = [];
  announcer = inject(LiveAnnouncer);

  constructor(
    public dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData,
    private taskService: TasksService,
    private snackBar: MatSnackBar
  ) {
    // Form group
    this.taskForm = new FormGroup({
      title: new FormControl(this.data.task.title || '', Validators.required),
      description: new FormControl(this.data.task.description || '', Validators.required),
      category: new FormControl(this.data.task.category || '', [Validators.required]),
      dueDate: new FormControl(
        this.data.task.dueDate ? new Date(this.data.task.dueDate.toMillis()) : null,
        Validators.required
      ),
      assignments: new FormControl(this.data.task.assignments || [], [Validators.required]),
      priority: new FormControl(this.data.task.priority || 'low'),
      subtasks: new FormArray([]),
      status: new FormControl(this.data.task.status || 'todo'),
    });

    // Due date
    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
    this.maxDate = new Date(currentYear + 1, 11, 31);

    // Initialize subtasks from data.task
    this.subtaskList = Array.isArray(this.data.task.subtasks) ? this.data.task.subtasks : [];

    // Update the subtasks form array
    this.updateSubtasksFormArray();
  }

  ngOnInit() {
    this.updateSubtasksFormArray();
  }

  async onSubmit() {
    if (this.taskForm.valid) {
      await this.updateTask();
    } else {
      this.showSnackbar('Please fill in all required fields', 'error-snackbar');
    }
  }

  async updateTask() {
    if (this.taskForm.valid) {
      try {
        const updatedTask: TaskClass = {
          ...this.data.task,
          ...this.taskForm.value,
          dueDate: this.taskForm.value.dueDate instanceof Date ? this.taskForm.value.dueDate : null,
        };

        this.updateSubtasksFormArray(); // Ensure subtasks are updated before updating the task

        await this.taskService.update(updatedTask);
        this.showSnackbar('Task updated successfully', 'success-snackbar');
        this.dialogRef.close({ task: updatedTask });
      } catch (error) {
        console.error('Error updating task:', error);
        this.showSnackbar('Failed to update task', 'error-snackbar');
      }
    } else {
      this.showSnackbar('Please fill in all required fields', 'error-snackbar');
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
      panelClass: [panelClass],
    });
  }

  // Subtasks
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add subtask
    if (value) {
      this.subtaskList.push({ name: value });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(subtask: SubtaskClass): void {
    const index = this.subtaskList.indexOf(subtask);

    if (index >= 0) {
      this.subtaskList.splice(index, 1);

      this.announcer.announce(`Removed ${subtask.name}`);
    }
  }

  updateSubtasksFormArray(): void {
    const subtasksArray = this.taskForm.get('subtasks') as FormArray;
    subtasksArray.clear(); // Clear the existing form array

    // Add each subtask from subtaskList to the form array
    this.subtaskList.forEach((subtask) => {
      subtasksArray.push(new FormControl(subtask.name));
    });
  }

  cancel(): void {
    this.data.task.title = this.backupTask.title;
    this.data.task.description = this.backupTask.description;
    this.dialogRef.close(this.data);
  }
}

export interface TaskDialogData {
  task: Partial<TaskClass>;
  enableDelete: boolean;
}

export interface TaskDialogResult {
  task: TaskClass;
  delete?: boolean;
}
