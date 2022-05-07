import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/Task';
import { Subscription } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  
  text!:string
  day!:string
  reminder:boolean = false;
  productForm!: FormGroup;  
  //showAddTask: boolean =true;
  subscription!: Subscription;

  constructor( private taskService:TaskService, private formBuilder:FormBuilder) {
    
   }
   

  ngOnInit(): void {  
    
  }

  onSubmit(){
    
    if(!this.text){
      alert('please add a task')
      return;
    }
    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder
    }

    

    //this.taskService.addTask(newTask).subscribe(response => console.log(response))

    this.text=''
    this.day=''
    this.reminder=false

  }


}
