import { Component, OnInit } from '@angular/core';
import { TaskClass } from 'src/app/models/task.class';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { BoardDialogComponent, TaskDialogResult } from './board-dialog/board-dialog.component';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-sidenav-board',
  templateUrl: './sidenav-board.component.html',
  styleUrls: ['./sidenav-board.component.scss']
})
export class SidenavBoardComponent implements OnInit {
  todo: TaskClass[] = [];
  inProgress: TaskClass[] = [];
  done: TaskClass[] = [];

  constructor(
    private dialog: MatDialog,
    private taskService: TasksService,
  ) {}

  /////// Firestore
  ngOnInit(): void {
    console.log('SidenavBoardComponent initialized');
    this.loadTasks();
  }


  private loadTasks(): void {
    this.taskService.getAll().subscribe(tasks => {
      console.log('Fetched tasks from Firestore:', tasks);
      // Clear existing tasks
      this.todo = [];
      this.inProgress = [];
      this.done = [];

      // Categorize tasks based on their status
      tasks.forEach(task => {
        if (task.status === 'todo') {
          this.todo.push(task);
        } else if (task.status === 'inProgress') {
          this.inProgress.push(task);
        } else if (task.status === 'done') {
          this.done.push(task);
        }
      });
    });
  }


  ///////////////

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
