import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css','./login-page-mobile.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup = this.formBuilder.group({
    username:['', {
      validators:[Validators.required, this.loginValidator],
      updateOn:'change'}  
      ],
    password:['',[Validators.required]],
    
  })
  
  storedData!: string;

  constructor(
    private formBuilder:FormBuilder,
    private auth: AuthService,
    private route: Router,
    private localStorageService: LocalStorageService,
    private dialogService: ConfirmDialogService) { }

  ngOnInit(): void {

    

  }

  handleKeyUp(e:any){ 
    if(e.keyCode === 13){
      this.handleSubmit(e);
    }
  }

  handleSubmit(e:any){
    e.preventDefault();
    this.onSubmit()
  }

  onSubmit(){
    this.loginForm.updateValueAndValidity()

    const options = { 
      title: 'Error',
      message: 'Incorrect username or password',
      
      confirmText: 'Ok'
    };

    

    if(this.loginForm.status=== 'VALID'){   

      if(this.loginForm.get('username')!.value === 'admin' && this.loginForm.get('password')!.value === 'innovery' ){
        this.onSetData()
        this.route.navigate(['/app/home'])
      }else{
        
        
        this.dialogService.open(options)
        
      }


    }else{
      this.loginForm.markAllAsTouched()
    }
    
  }

  onSetData() {
    this.localStorageService.setItem(
      'UserData',
      this.loginForm.value
    );
  }

  /* onGetData() {
    this.storedData = this.localStorageService.getItem(this.loginForm.get('username')!.value);
  }

  onRemoveData() {
    this.localStorageService.removeItem(this.loginForm.get('username')!.value);
  }

  onClearData() {
    this.localStorageService.clear();
  } */

  loginValidator(control: FormControl) : {[s:string]:boolean} | null {
    
    if(control.value !== 'admin'){

      console.log('ERROR')

      return {'loginValidator':true}

    }

    console.log('nope')
    return null

    
  }

}
