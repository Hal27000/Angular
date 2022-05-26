import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {

  SignUpForm!: FormGroup;

  constructor(private formBuilder:FormBuilder,) { }

  ngOnInit(): void {
    this.SignUpForm = this.formBuilder.group({
      username:['',[Validators.required, Validators.email]],
      password:['',[Validators.required]]
    })
  }

  onSignUp(){

    if (this.SignUpForm.status === 'VALID'){
      alert('A confirmation email has been sent to your inbox.')
    }else{
      this.SignUpForm.markAllAsTouched()
    }
    
  }

}
