import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  lang!:string
  
  lingue =['en','it']

  constructor(
    private router: Router,
    private localstorageservice: LocalStorageService,
    
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
