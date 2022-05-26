import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }


  isLoggedIn(){

    let checkvalue:any = ''
    let truthy = false

    //se l'oggetto utente non è presente nel localstorage 
    if(localStorage.getItem('UserData') === null){

      //se invece lo è
    }else{
      //inserisci l'oggetto utente nel localstorage
      checkvalue = JSON.parse(localStorage.getItem('UserData')!)

      // se l'oggetto corrisponde alle credenziali giuste
      if (checkvalue['username'] === 'admin' && checkvalue['password']=== 'innovery' ) {

      
        truthy = true
      }

    }

    return truthy
  }
}
