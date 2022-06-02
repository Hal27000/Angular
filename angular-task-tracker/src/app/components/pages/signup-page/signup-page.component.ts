import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';



@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css','./signup-page-mobile.component.css']
})
export class SignupPageComponent implements OnInit {

  SignUpForm!: FormGroup;

  constructor(private formBuilder:FormBuilder,
    private dialogService: ConfirmDialogService) { }

  ngOnInit(): void {
    this.SignUpForm = this.formBuilder.group({
      username:['',[Validators.required, Validators.email]],
      password:['',[Validators.required]]
    })
  }

  onSignUp(){

    const options = {
      title: 'Success',
      message: 'A confirmation email has been sent to your inbox.',
      
      confirmText: 'Ok'
    };

    if (this.SignUpForm.status === 'VALID'){
      this.dialogService.open(options)
      
    }else{
      this.SignUpForm.markAllAsTouched()
    }
    
  }

}
