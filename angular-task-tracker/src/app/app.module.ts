import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader'


//Components
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { HeaderComponent } from './components/header/header.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { FooterComponent } from './components/footer/footer.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { TableComponent } from './components/table/table.component';
import { AboutComponent } from './components/pages/about/about.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { NotfoundPageComponent } from './components/pages/notfound-page/notfound-page.component'
import { SignupPageComponent } from './components/pages/signup-page/signup-page.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AppPageComponent } from './components/pages/app-page/app-page.component';
import { ContactPageComponent } from './components/pages/contact-page/contact-page.component';

//Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

//Prime
import {TableModule} from 'primeng/table';
import { ToastModule } from 'primeng/toast';

import { AuthGuard } from './auth.guard';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { MessageService } from 'primeng/api';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const appRoutes : Routes = [
  {path: '', component: LoginPageComponent},
  {path: 'signup', component: SignupPageComponent},
  {path: 'app', component: AppPageComponent, canActivate: [AuthGuard],
    children:[
      {path: 'home', component: TasksComponent, canActivate: [AuthGuard]},
      {path: 'new', component: TaskFormComponent, canActivate: [AuthGuard]},
      {path: 'edit', redirectTo:'app'},
      {path: 'edit/:id', component: TaskFormComponent, canActivate: [AuthGuard]},
      {path: 'contact', component: ContactPageComponent},
      {path: 'about', component: AboutComponent},
    ]
  },
  
  { path: '**', component: NotfoundPageComponent }

]

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    HeaderComponent,
    TasksComponent,
    TaskItemComponent,
    AboutComponent,
    FooterComponent,
    TaskFormComponent,
    ConfirmDialogComponent,
    TableComponent,
    LoginPageComponent,
    NotfoundPageComponent,
    SidenavComponent,
    SignupPageComponent,
    ToolbarComponent,
    AppPageComponent,
    ContactPageComponent,
    FileUploadComponent,
    
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, {enableTracing:true}),
    TranslateModule.forRoot(
      {loader:{
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }}
    ),

    //MATERIAL------------------------------------------------------------------
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,    
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule,
    MatSlideToggleModule,

    //PRIMENG----------------------------------------------------------
    TableModule,
    ToastModule
  ],
  providers: [AuthGuard, HttpClient, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
