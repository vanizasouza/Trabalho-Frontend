import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './core/models/usuarios';
import { Task } from './core/models/task';
import {Comment} from './core/models/comentarios';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private urlTarefas = 'http://localhost:8000/api/tasks/';
  private urlUsuarios = 'http://localhost:8000/api/users/';
  private urlComentarios = 'http://localhost:8000/api/comments/';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.urlUsuarios);
  }

  enviarDadosTask(data: any): Observable<any> {
    return this.http.post(this.urlTarefas, data);
  }

  getTasks(params?: any): Observable<Task[]> {
    return this.http.get<Task[]>(this.urlTarefas, { params });
  }

  postUsuarios(data: any): Observable<any> {
    return this.http.post(this.urlUsuarios, data);
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.urlTarefas}${id}/`);
  }

  atualizarTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.urlTarefas}${task.id}/`, task);
  }

  getComments(taskId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.urlComentarios}?task_id=${taskId}`);
  }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.urlComentarios, comment);
  }

  updateComment(comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(`${this.urlComentarios}${comment.id}/`, comment);
  }


}
