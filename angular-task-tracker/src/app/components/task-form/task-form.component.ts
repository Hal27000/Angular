import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Subscription, first } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import { FormBuilder, FormControl, FormGroup,  FormGroupDirective,  Validators } from '@angular/forms';
import { Task } from 'src/app/models/Task';
import { MatDialog } from '@angular/material/dialog'
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  @Input() id!: string;
  isAddMode!: boolean 
  productForm!: FormGroup;  
  selectedFile!: File;

  constructor(
    private route: ActivatedRoute, private router: Router,
    private taskService:TaskService, private formBuilder:FormBuilder,
    public dialog: MatDialog, private http: HttpClient, private messageService: MessageService
  ) { }

  ngOnInit(): void {

    this.productForm = this.formBuilder.group({
      taskName:['', [Validators.required, Validators.maxLength(250)]],
      date:['',Validators.required],
      reminder:[false ],
      image:['']
    })
    
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    if (!this.isAddMode) {
      this.taskService.getById(this.id)
          .pipe(first())
          .subscribe(x =>  this.productForm.patchValue(x) );
    }
  }

  

  onSubmit(){

        
    console.log(this.productForm)

    const newTask:Task = {
      taskName: this.productForm.value.taskName,
      date: this.productForm.value.date,
      reminder: this.productForm.value.reminder,
      image:this.productForm.value.image     
    }    

    if(this.productForm.valid){

      if(this.isAddMode){        
        this.addTask(newTask)
      }else{        
        this.updateTask()
      }      
      this.productForm.updateValueAndValidity()
      console.log("RESET")
      this.productForm.reset()
      console.log(this.productForm) 
      
      if (this.isAddMode) {
        this.addSingle('Success','The task has been saved')
        this.dialog.open(ConfirmDialogComponent);
      } else {
        this.addSingle('Success','The task has been updated')
        this.router.navigate(['app/home'])
      }

      
    }else{
      this.productForm.markAllAsTouched()
    }  
  }



  

  onFileSelected(event:any){
    
    this.onUpload(<File>event.target.files[0])

  }

  onUpload(file: File){
    
    const boh = this.toBase64(file) 
    boh.then((result:string) =>{
      this.productForm.value.image = result/* .slice((result.indexOf(',')+1)) */
    })   
    
  }

  toBase64(file:File): any{ 

    return new Promise(function(resolve, reject) {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
      
    })
  };













  private addTask(newTask: Task){
    this.taskService.addTask(newTask).subscribe()     
  }

  private updateTask() {
    console.log('DENTRO UPDATETASK')
    console.log(this.productForm.value)

    this.taskService.update(this.id, this.productForm.value)
        .pipe(first())
        .subscribe( x => console.log(x));
        console.log('UPDATE COMPLETATO')        
  }

  addSingle(title:any, detail:string) {
    this.messageService.add({severity:'success', summary: title, detail:detail});
  }

  /* get taskNameForm() {
    return this.productForm.get('taskName') as FormControl;
  } */

}
