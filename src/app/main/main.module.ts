import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';

import {Routes, RouterModule} from "@angular/router";
import {AuthComponent} from "../auth/auth.component";
import {MovieListComponent} from "./movie-list/movie-list.component";
import {MovieFormComponent} from "./movie-form/movie-form.component";
import {MovieDetailsComponent} from "./movie-details/movie-details.component";

import {ApiService} from "../api.service";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

// Reactive Form Module
import {ReactiveFormsModule} from "@angular/forms";



const routes: Routes = [
  { path: 'movies', component: MainComponent },
];
@NgModule({
  declarations: [
    MainComponent,
    MovieListComponent,
    MovieDetailsComponent,
    MovieFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  exports: [
    RouterModule,
  ],
  providers: [
    ApiService,
  ]
})
export class MainModule { }
