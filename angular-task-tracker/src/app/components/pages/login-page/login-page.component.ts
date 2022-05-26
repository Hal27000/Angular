import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup;
  storedData!: string;
  msg=''
  loginUserData = {}

  constructor(
    private formBuilder:FormBuilder,
    private auth: AuthService,
    private route: Router,
    private localStorageService: LocalStorageService) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]]
    })

    /* if(this.onGetData) */

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
    console.log(this.loginForm.value)

    if(this.loginForm.status=== 'VALID'){

    

    if(this.loginForm.get('username')!.value === 'admin' && this.loginForm.get('password')!.value === 'innovery' ){
      this.onSetData()
      this.route.navigate(['/app/home'])
    } else{
      alert('credenziali errate')
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

  onGetData() {
    this.storedData = this.localStorageService.getItem(this.loginForm.get('username')!.value);
  }

  onRemoveData() {
    this.localStorageService.removeItem(this.loginForm.get('username')!.value);
  }

  onClearData() {
    this.localStorageService.clear();
  }

}
