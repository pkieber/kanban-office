import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskClass } from 'src/app/models/task.class';
import { ShowTaskDialogComponent } from '../show-task-dialog/show-task-dialog.component';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';

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
      // console.log('Task data before opening dialog:', this.task);
      const dialogRef = this.dialog.open(ShowTaskDialogComponent, {
        data: { task: this.task },
      });
    }
  }


  /*
  onEditClick() {
    console.log('Edit clicked');
    this.edit.emit();
  }
  */

  onEditTask(): void {
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      data: { task: this.task }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
