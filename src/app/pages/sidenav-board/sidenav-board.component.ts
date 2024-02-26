import { Component, OnInit } from '@angular/core';
import { TaskClass } from 'src/app/models/task.class';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { TasksService } from 'src/app/services/tasks.service';
import { BoardDialogComponent } from './board-dialog/board-dialog.component';
import { TaskDialogResult } from './edit-task-dialog/edit-task-dialog.component';

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


  ngOnInit(): void {
    console.log('SidenavBoardComponent initialized');
    this.loadTasks();
  }


  private loadTasks(): void {
    this.taskService.getAll().subscribe(tasks => {
      // console.log('Fetched tasks from Firestore:', tasks);
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


  /* Kann man löschen */
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
  /* */

  drop(event: CdkDragDrop<TaskClass[]>): void {
    if (event.previousContainer === event.container) {
      return;
    }

    const movedTask = event.previousContainer.data[event.previousIndex];

    // Update the status based on the container (list) where the task was dropped
    let newStatus: 'todo' | 'inProgress' | 'done' = 'todo'; // Default value
    if (event.container.id === 'todo') {
      newStatus = 'todo';
    } else if (event.container.id === 'inProgress') {
      newStatus = 'inProgress';
    } else if (event.container.id === 'done') {
      newStatus = 'done';
    }

    // Update the status of the moved task
    movedTask.status = newStatus;

    // Save the updated task to Firestore
    this.taskService.update(movedTask)
      .then(() => {
        console.log('Task status updated successfully.');
      })
      .catch((error) => {
        console.error('Error updating task status:', error);
      });
  }

}
