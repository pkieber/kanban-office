import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskClass } from 'src/app/models/task.class';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-sidenav-summary',
  templateUrl: './sidenav-summary.component.html',
  styleUrls: ['./sidenav-summary.component.scss']
})
export class SidenavSummaryComponent implements OnInit {
  taskList$!: Observable<TaskClass[]>;

  totalTasksCount: number = 0;
  urgentTasksCount: number = 0;
  todoTasksCount: number = 0;
  tasksInProgessCount: number = 0;
  doneTasksCount: number = 0;
  nextDeadline: Date | null = null;

  constructor(private taskService: TasksService) { }

  ngOnInit(): void {
    this.loadTaskSummary();
  }

  loadTaskSummary() {
    this.taskList$ = this.taskService.getAll();
    this.taskList$.subscribe(tasks => {
      this.totalTasksCount = tasks.length;
      this.urgentTasksCount = tasks.filter(task => task.priority === 'urgent').length;
      this.todoTasksCount = tasks.filter(task => task.status === 'todo').length;
      this.tasksInProgessCount = tasks.filter(task => task.status === 'inProgress').length;
      this.doneTasksCount = tasks.filter(task => task.status === 'done').length;

      // Find the earliest due date among tasks that have due dates
      const tasksWithDueDates = tasks.filter(task => task.dueDate);
      if (tasksWithDueDates.length > 0) {
        const timestamps = tasksWithDueDates.map(task => task.dueDate!.toDate().getTime());
        const earliestTimestamp = Math.min(...timestamps);
        this.nextDeadline = new Date(earliestTimestamp);
      } else {
        this.nextDeadline = null;
      }
    });
  }
}

