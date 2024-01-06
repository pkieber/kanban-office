import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskClass } from 'src/app/models/task.class';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.scss']
})
export class EditTaskDialogComponent {
  private backupTask: Partial<TaskClass> = { ...this.data.task };

    // Due date
    minDate: Date | undefined;
    maxDate: Date | undefined;

  constructor(
    public dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData
  ) {}

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
