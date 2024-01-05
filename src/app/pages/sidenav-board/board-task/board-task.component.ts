import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskClass } from 'src/app/models/task.class';
import { BoardTaskDialogComponent } from '../board-task-dialog/board-task-dialog.component';

@Component({
  selector: 'app-board-task',
  templateUrl: './board-task.component.html',
  styleUrls: ['./board-task.component.scss']
})
export class BoardTaskComponent {
  @Input() task: TaskClass | null = null;
  @Output() edit = new EventEmitter<TaskClass>();

  constructor(private dialog: MatDialog) {}

  onClickShow(): void {
    if (this.task) {
      const dialogRef = this.dialog.open(BoardTaskDialogComponent, {
        data: { task: this.task },
      });

      dialogRef.afterClosed().subscribe(() => {
        // Handle the dialog closed event
        this.onTaskEdit();
      });
    }
  }

  onTaskEdit() {
    if (this.task) {
      this.edit.emit(this.task);
    }
  }
}
