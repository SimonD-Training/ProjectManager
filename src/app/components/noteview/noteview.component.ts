import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { notesI } from 'src/app/interfaces/notes';
import { projectI } from 'src/app/interfaces/project';
import { DatetimeService } from 'src/app/services/datetime.service';
import { NotesService } from 'src/app/services/notes.service';
import { PreferenceService } from 'src/app/services/preference.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-noteview',
  templateUrl: './noteview.component.html',
  styleUrls: ['./noteview.component.scss'],
})
export class NoteviewComponent implements OnInit {
  Notes: notesI[] | null = null;
  public get darkmode(): boolean {
    return this.preferences.darkmode;
  }
  public get project(): projectI {
    return this.notes.project;
  }

  search = faSearch;
  active = 1;
  show = false;
  constructor(
    private router: Router,
    private preferences: PreferenceService,
    private projects: ProjectsService,
    private notes: NotesService,
    public datetime: DatetimeService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.notes.getNotes().subscribe({
      next: (value) => {
        this.Notes = value;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  createNote(form: NgForm) {
    this.notes.createNote(form.controls['note'].value).subscribe((data) => {
      if (!data) {
        if (this.show) return;
        this.show = true;
        this.Toast1.show();
        setInterval(() => {
          this.show = false;
          this.Toast1.hide();
        }, 3000);
      } else {
        this.notes.getNotes().subscribe({
          next: (value) => {
            this.Notes = value;
          },
          error: (error) => {
            console.log(error);
          },
        });
      }
    });
  }

  editProject(project_submission: NgForm) {
    let sum: {
      id: number;
      title: string;
      start: string;
      due: string;
      description: string;
    } = {
      id: parseInt(this.project.project_id),
      title: '',
      start: '',
      due: '',
      description: '',
    };
    ['title', 'start', 'due', 'description'].forEach(
      (prop) =>
        (sum[
          prop as keyof {
            title: string;
            start: string;
            due: string;
            description: string;
          }
        ] = project_submission.controls[prop].value)
    );
    this.projects.updateProject(sum).subscribe((data) => {
      if (!data) {
        if (this.show) return;
        this.show = true;
        this.Toast1.show();
        setInterval(() => {
          this.show = false;
          this.Toast1.hide();
        }, 3000);
      } else {
        this.projects
          .getProject(parseInt(this.project.project_id))
          .subscribe({
            next: (value) => {
              if (value) this.notes.project = value[0];
            },
            error: (err) => {
              console.log(err);
            },
          });
      }
    });
  }

  deleteProject() {
    this.projects.deleteProject(this.project).subscribe({
      next: (value) => {
        if (value) this.router.navigate(['/']);
        else {
          if (this.show) return;
          this.show = true;
          this.Toast1.show();
          setInterval(() => {
            this.show = false;
            this.Toast1.hide();
          }, 3000);
        }
      },
      error: (err) => {
        console.log(err);
        if (this.show) return;
        this.show = true;
        this.Toast1.show();
        setInterval(() => {
          this.show = false;
          this.Toast1.hide();
        }, 3000);
      },
    });
  }

  open(content: TemplateRef<NgbModal>) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.finally();
  }

  @ViewChild('toast') Toast1!: NgbToast;
}
