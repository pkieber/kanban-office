import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskClass } from 'src/app/models/task.class';

@Component({
  selector: 'app-board-task-dialog',
  templateUrl: './board-task-dialog.component.html',
  styleUrls: ['./board-task-dialog.component.scss']
})
export class BoardTaskDialogComponent {
  @Input() task: TaskClass | null = null;
  @Output() edit = new EventEmitter<TaskClass>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { task: TaskClass },
    public dialogRef: MatDialogRef<BoardTaskDialogComponent>
  ) {}

  onEditDisplayedCard(): void {
    if (this.task !== null) {
      // Implement your edit logic here if needed
      // Emit the edit event
      this.edit.emit(this.task);
      // Close the dialog
      this.dialogRef.close();
    }
  }
}
