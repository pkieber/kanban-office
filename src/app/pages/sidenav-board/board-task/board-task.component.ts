import { Component } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/models/task.class';

@Component({
  selector: 'app-board-task',
  templateUrl: './board-task.component.html',
  styleUrls: ['./board-task.component.scss']
})
export class BoardTaskComponent {
  @Input() task: Task | null = null;
  @Output() edit = new EventEmitter<Task>();
}

