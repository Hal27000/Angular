import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http'

import { Task } from 'src/app/models/Task';

const HttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:5000/tasks'
  
  tasks: Task[] = []

  constructor(private http:HttpClient) { }

  getTasks(): Observable<Task[]>{
    return this.http.get<Task[]>(this.apiUrl)
  }

  //fa il GET del task dal server in base all'id che viene passato
  getById(id: string) {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  addTask(task:Task): Observable<Task>{    
    return this.http.post<Task>(this.apiUrl, task, HttpOptions)
  }

  //update di tutti i parametri del task
  update(id: string, params: any) {
    return this.http.put(`${this.apiUrl}/${id}`, params);
}

  updateTaskReminder(task: Task): Observable<Task>{
    const url = `${this.apiUrl}/${task.id}`
    return this.http.put<Task>(url, task, HttpOptions)
    
  }

  deleteTask(task: Task): Observable<Task>{
    const url = `${this.apiUrl}/${task.id}`
    return this.http.delete<Task>(url)
  }

  

  
}
