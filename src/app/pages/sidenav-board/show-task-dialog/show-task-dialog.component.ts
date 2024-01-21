import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TaskClass } from 'src/app/models/task.class';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TasksService } from 'src/app/services/tasks.service';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';

@Component({
  selector: 'app-show-task-dialog',
  templateUrl: './show-task-dialog.component.html',
  styleUrls: ['./show-task-dialog.component.scss']
})
export class ShowTaskDialogComponent {
  @Input() task: TaskClass | null = null;
  @Output() edit = new EventEmitter<TaskClass>();

  // Add FormGroup for the task form
  taskForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { task: TaskClass },
    public dialogRef: MatDialogRef<ShowTaskDialogComponent>,
    private fb: FormBuilder,
    private taskService: TasksService,
    private dialog: MatDialog,
  ) {
    // Initialize taskForm with empty values
    this.taskForm = fb.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      dueDate: new FormControl(null, Validators.required),
      assignments: new FormControl('', Validators.required),
      priority: new FormControl('low'),
      subtasks: fb.array([]), // Use FormBuilder for the FormArray
      status: new FormControl('todo'),
    });
  }


  // Initialize the form when the component receives new task data
  ngOnChanges() {
    if (this.task) {
      this.taskForm.setValue({
        title: this.task.title,
        description: this.task.description,
        category: this.task.category,
        dueDate: this.task.dueDate,
        assignments: this.task.assignments,
        priority: this.task.priority,
        subtasks: this.task.subtasks,
        status: this.task.status,
      });
    }
  }


  onTaskEdit() {
    // Close the current dialog
    this.dialogRef.close();

    // Open the new dialog
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      data: { task: this.data.task }
    });

    /*
    dialogRef.afterClosed().subscribe(result => {
      console.log('Edit Task Dialog closed with result:', result);
    });
    */
  }

}

