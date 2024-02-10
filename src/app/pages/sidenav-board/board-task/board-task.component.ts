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
      const dialogRef = this.dialog.open(ShowTaskDialogComponent, {
        data: { task: this.task },
      });
    }
  }


  getInitials(assignment: string): string {
    if (!assignment) return '';

    const names = assignment.split(' ');
    if (names.length === 0) return '';
    return names.map(name => name.charAt(0)).join('');
  }


  onEditTask(): void {
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      data: { task: this.task }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
