import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskClass } from 'src/app/models/task.class';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'; // Import FormBuilder and FormGroup

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
    private fb: FormBuilder // Inject FormBuilder
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
    this.dialogRef.close();
    if (this.task) {
      // Emit the edited task with the updated form values
      this.edit.emit({ ...this.task, ...this.taskForm.value });
    }
  }
}

