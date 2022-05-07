import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { notesI } from '../interfaces/notes';
import { projectI, template_project } from '../interfaces/project';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  project: projectI = template_project;
  constructor(private http: HttpClient) {}

  getNotes():Observable<notesI[] | null> {
    let obs = new Observable<notesI[] | null>((observer) => {
      this.http
        .post<notesI[] | null>(`/get/notes/project_id/?value=${this.project.project_id}`, null, { observe: 'response' })
        .subscribe({ next: (value) => {
          console.log(value.body);
          observer.next(value.body);
        }, error: (err) => {
          console.log(err);
          observer.next(null);
        } });
    });
    return obs;
  }

  createNote(note: string): Observable<boolean> {
    let obs = new Observable<boolean>((observer) => {
      this.http
        .post<boolean>('/notes', { id: this.project.project_id, note: note, date: new Date().toISOString()}, { observe: 'response' })
        .subscribe({
          next: (data) => {
            if (!data.body) observer.next(false);
            else observer.next(data.body);
          },
          error: (err) => {
            console.log(err);
            observer.next(false);
          },
        });
    });
    return obs;
  }
}
