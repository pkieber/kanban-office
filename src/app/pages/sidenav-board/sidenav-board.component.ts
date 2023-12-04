import { Component } from '@angular/core';
import { TaskClass } from 'src/app/models/task.class';
import { Firestore, collection, collectionData, doc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { BoardDialogComponent, TaskDialogResult } from './board-dialog/board-dialog.component';

@Component({
  selector: 'app-sidenav-board',
  templateUrl: './sidenav-board.component.html',
  styleUrls: ['./sidenav-board.component.scss']
})
export class SidenavBoardComponent {
  todo: TaskClass[] = [
    {
      title: 'Buy milk',
      description: 'Go to the store and buy milk',
    },
    {
      title: 'Create a Kanban app',
      description: 'Using Firebase and Angular create a Kanban app!',
    },
  ];
  inProgress: TaskClass[] = [];
  done: TaskClass[] = [];

  constructor(private dialog: MatDialog, private firestore: Firestore) {}

  private taskCollection = collection(this.firestore, 'tasks'); //
  allTasks$ = collectionData(this.taskCollection) as Observable<TaskClass[]>; //


  newTask(): void {
    const dialogRef = this.dialog.open(BoardDialogComponent, {
      width: '270px',
      data: {
        task: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: TaskDialogResult) => {
        if (!result || !result.task || !result.task.title.trim()) { // Only add if not empty.
          return;
        }
        this.todo.push(result.task);
      });
  }

  editTask(list: 'done' | 'todo' | 'inProgress', task: TaskClass): void {
    const dialogRef = this.dialog.open(BoardDialogComponent, {
      width: '270px',
      data: {
        task,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult) => {
      if (!result) {
        return;
      }
      const dataList = this[list];
      const taskIndex = dataList.indexOf(task);
      if (result.delete) {
        dataList.splice(taskIndex, 1);
      } else {
        dataList[taskIndex] = task;
      }
    });
  }

  drop(event: CdkDragDrop<TaskClass[]>): void {
    if (event.previousContainer === event.container) {
      return;
    }
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }
}
