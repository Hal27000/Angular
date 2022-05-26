import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-app-page',
  templateUrl: './app-page.component.html',
  styleUrls: ['./app-page.component.css']
})
export class AppPageComponent implements OnInit {

  lang!:string
  
  lingue =['en','it']

  constructor(
    private router: Router,
    private localstorageservice: LocalStorageService,
    private messageService: MessageService
    
  ) { }

  ngOnInit(): void {
    this.lang= localStorage.getItem('lang') || 'it'
  }

  hasRoute(route: string){
    return this.router.url === route;
  }

  changeLang(){
    localStorage.setItem('lang',this.lang)
    
  }

  logOut(){
    console.log('ciaone')
    this.localstorageservice.removeItem('UserData')
    this.router.navigate(['/'])
  }

  funzione(lingua:string){
    this.localstorageservice.setLang('lang', lingua)
    console.log(lingua)
    window.location.reload()
    
  }

  

}
