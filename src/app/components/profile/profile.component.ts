import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { projectI } from 'src/app/interfaces/project';
import { DatetimeService } from 'src/app/services/datetime.service';
import { NotesService } from 'src/app/services/notes.service';
import { PreferenceService } from 'src/app/services/preference.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  Projects: projectI[] | null = null;
  public get darkmode(): boolean {
    return this.preferences.darkmode;
  }
  search = faSearch;
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
    this.projects.getProjects().subscribe({
      next: (value) => {
        this.Projects = value;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  setProject(project: projectI) {
    this.notes.project = project;
    this.router.navigate(['/notes']);
  }
  createProject(project_submission: NgForm) {
    let sum: {
      title: string;
      start: string;
      due: string;
      description: string;
    } = {
      title: '',
      start: '',
      due: '',
      description: '',
    };
    try {
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
      this.projects.createProject(sum).subscribe((data) => {
        if (data) {
          this.projects.getProjects().subscribe({
            next: (value) => {
              this.Projects = value;
            },
            error: (err) => {
              console.log(err);
            },
          });
        } else {
          if (this.show) return;
          this.show = true;
          this.Toast1.show();
          setInterval(() => {
            this.show = false;
            this.Toast1.hide();
          }, 3000);
        }
      });
    } catch (error) {
      console.log(error);
      project_submission.form.setErrors({ createFailed: true });
      if (this.show) return;
      this.show = true;
      this.Toast1.show();
      setInterval(() => {
        this.show = false;
        this.Toast1.hide();
      }, 3000);
    }
  }

  open(content: TemplateRef<NgbModal>) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.finally();
  }

  @ViewChild('toast') Toast1!: NgbToast;
}
