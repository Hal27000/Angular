import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,  FormGroupDirective,  Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit {

  contactForm!: FormGroup; 

  constructor(
    private formBuilder:FormBuilder,
  ) { }

  ngOnInit(): void {

    this.contactForm = this.formBuilder.group({
      name:['', [Validators.required, Validators.maxLength(250)]],
      email:['',[Validators.required, Validators.email]],
      
      message:['',[Validators.required]],
      reminder:[false ],
    })
  }

  onSubmit(){

    if(this.contactForm.status === 'VALID'){}
    else{
      this.contactForm.markAllAsTouched()
    }
  }

}
