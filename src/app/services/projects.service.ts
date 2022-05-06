import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { projectI } from '../interfaces/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private http: HttpClient) {}

  getProjects(): Observable<projectI[] | null> {
    let obs = new Observable<projectI[] | null>((observer) => {
      this.http
        .post<projectI[]>('/get/projects', null, { observe: 'response' })
        .subscribe({
          next: (value) => {
            observer.next(value.body);
          },
          error: (err) => {
            console.log(err);
            observer.next(null);
          },
        });
    });
    return obs;
  }

  getProject(id: number): Observable<projectI[] | null> {
    let obs = new Observable<projectI[] | null>((observer) => {
      this.http
        .post<projectI[]>(`/get/projects/project_id/?value=${id}`, null, { observe: 'response' })
        .subscribe({
          next: (value) => {
            observer.next(value.body);
          },
          error: (err) => {
            console.log(err);
            observer.next(null);
          },
        });
    });
    return obs;
  }

  createProject(sum: {
    title: string;
    start: string;
    due: string;
    description: string;
  }): Observable<boolean> {
    let obs = new Observable<boolean>((observer) => {
      this.http
        .post<boolean>('/projects', sum, { observe: 'response' })
        .subscribe({
          next: (data) => {
            if (!data.body) observer.next(false);
            else observer.next(data.body!);
          },
          error: (err) => {
            console.log(err);
            observer.next(false);
          },
        });
    });
    return obs;
  }

  updateProject(sum: {
    id: number
    title: string;
    start: string;
    due: string;
    description: string;
  }): Observable<boolean> {
    let obs = new Observable<boolean>((observer) => {
      this.http
        .put<boolean>('/projects', sum, { observe: 'response' })
        .subscribe({
          next: (data) => {
            if (!data.body) observer.next(false);
            else observer.next(data.body!);
          },
          error: (err) => {
            console.log(err);
            observer.next(false);
          },
        });
    });
    return obs;
  }

  deleteProject(project: projectI): Observable<boolean> {
    let obs = new Observable<boolean>((observer) => {
      this.http
        .delete<boolean>(`/delete/projects/project_id/?value=${project.project_id}`, { observe: 'response' })
        .subscribe({ next: (data) => {
          if (!data.body) observer.next(false);
          else observer.next(data.body);
        }, error: (err) => {
          console.log(err);
          observer.next(false);
        } });
    });
    return obs;
  }
}
