import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/Task';
import { faTimes, faPencil } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {

  @Input() task!:Task;
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter()
  @Output() onToggleReminder: EventEmitter<Task> = new EventEmitter()

  faTimes= faTimes;
  faPencil= faPencil;

  constructor() { }

  ngOnInit(): void {
  }

  onDelete(task:Task){
    this.onDeleteTask.emit(task)
  }

  onEdit(task:Task){
    console.log(task)
  }

  onToggle(task:Task){
    this.onToggleReminder.emit(task)
  }



}
