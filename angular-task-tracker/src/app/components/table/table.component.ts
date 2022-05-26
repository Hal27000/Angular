import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/Task';
import { faTimes, faPencil } from '@fortawesome/free-solid-svg-icons';
import { MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [MessageService]
})
export class TableComponent implements OnInit {

  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter()

  tasks: Task[] = []

  taskToBeDeleted!:Task

  cols!: any[]

  faTimes= faTimes;
  faPencil= faPencil;

  constructor(
    private taskService: TaskService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(
      (tasks)=> this.tasks = tasks 
    );

    this.cols = [
      { field: 'id', header:'ID'},
      { field: 'taskName', header:'Task Name'},
      { field: 'date', header:'Date'},
      { field: 'reminder', header:'Reminder'}
    ]

  }

  onDelete(task:Task){
    this.onDeleteTask.emit(task)
    
  }

  alertTask(task: Task){
    console.log(task)
    this.messageService.clear();
    this.taskToBeDeleted = task
    this.messageService.add({key: 'c', sticky: true, severity:'error', summary:'Are you sure?', detail:'Confirm to proceed'});
  }

  deleteTask(task: Task){
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Are you sure?', detail:'Confirm to proceed'});

    /* this.taskService
    .deleteTask(task)
    .subscribe(
      () => (this.tasks = this.tasks.filter((t) => t.id !== 
      task.id)) 
    ); */
  }

  onConfirm() {

    console.log(this.taskToBeDeleted)

    this.taskService
    .deleteTask(this.taskToBeDeleted)
    .subscribe(
      () => (this.tasks = this.tasks.filter((t) => t.id !== 
      this.taskToBeDeleted.id)) 
    );
    
    this.messageService.clear('c');
  }

  onReject() {
      this.messageService.clear('c');
  }

  toggleReminder(task: Task){
    task.reminder = !task.reminder
    this.taskService
    .updateTaskReminder(task)
    .subscribe();
  }

  attachment(base64:string){

    console.log(base64)

    const prefix = base64.split(';')[0]

    const suffix = ';base64'

    console.log(prefix)
    
      //window.open(/* "data:application/pdf;base64," +  */base64);
    switch (prefix) {

      case 'data:application/pdf':
        console.log('è un pdf')
        this.createDownloadLink(base64)
        
      break;

      case 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        console.log('è un word')
        this.createDownloadLink(base64)
        
      break;

    
      default:

      console.log('Sto utilizzando il default')

      window.open(base64)
      break;
    }

      
  }

  createDownloadLink(base64:string){
    const downloadLink = document.createElement("a");
      downloadLink.href = base64;
      downloadLink.download = "attachment.docx";

      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
  }

  

}
