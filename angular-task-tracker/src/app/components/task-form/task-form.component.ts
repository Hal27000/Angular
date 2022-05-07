import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import { FormBuilder, FormControl, FormGroup,  FormGroupDirective,  Validators } from '@angular/forms';
import { Task } from 'src/app/Task';
import {MatDialog} from '@angular/material/dialog'
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  text!:string
  day!:string
  reminder:boolean = false;

  randomList =["Work", "University", "Other"]

  
  productForm!: FormGroup;  
  //showAddTask: boolean =true;
  subscription!: Subscription;

  constructor(private taskService:TaskService,  private formBuilder:FormBuilder, public dialog: MatDialog ) { }

  ngOnInit(): void {

     this.productForm = this.formBuilder.group({
       taskName:['', Validators.required],
       date:['',Validators.required],
       reminder:['' ],
     })
  }

  get taskNameForm() {
    return this.productForm.get('taskName') as FormControl;
  }

  openDialog() {
    this.dialog.open(ConfirmDialogComponent);
  }

  onSubmit(ngForm : FormGroupDirective){

    //come accedere ai valori dei form
    //console.log(this.productForm.value.taskName)
    
    if(false){
      alert('please add a task')
      return;
    }
    const newTask:Task = {
      text: this.productForm.value.taskName,
      day: this.productForm.value.date,
      reminder: this.productForm.value.reminder,
      
    }

    if(this.productForm.valid){

      
      console.log(this.productForm)
      console.log("INVIO")

      this.taskService.addTask(newTask).subscribe(response => console.log(2))
      
      
      console.log(this.productForm)
      console.log("RESET")
      this.productForm.reset()
      console.log(this.productForm)
      // console.log("MARK AS PRISTINE")
      // this.productForm.markAsPristine()
      // console.log("MARK AS UNTOUCHED")
      // this.productForm.markAsUntouched()
      // console.log(this.productForm)
      // console.log("update value and validity")
      // this.productForm.updateValueAndValidity()
      // console.log(this.productForm)
      ngForm.resetForm()
      
      this.openDialog()
    }

    

    

    

  }

}
