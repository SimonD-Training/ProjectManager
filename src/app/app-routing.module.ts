import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteviewComponent } from './components/noteview/noteview.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {path: "", component: ProfileComponent},
  {path: "notes", component: NoteviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
