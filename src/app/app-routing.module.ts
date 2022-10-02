import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MuseumComponent } from './components/museum/museum.component';

const routes: Routes = [
  { path: 'museum', component: MuseumComponent }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
