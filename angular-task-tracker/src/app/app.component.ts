import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core'
import {MatSidenav} from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = `Task Tracker`

  constructor( private translateService: TranslateService){
    this.translateService.setDefaultLang('it')
    this.translateService.use(localStorage.getItem('lang') || 'it')
  }
}
