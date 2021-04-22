import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../../app-routing.module';

import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { ManagementComponent } from './components/management/management.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MovieManagementComponent } from './components/movie-management/movie-management.component';
import { ScreeningManagementComponent } from './components/screening-management/screening-management.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { ScreeningCardComponent } from './components/screening-card/screening-card.component';
import { AddScreeningComponent } from './components/add-screening/add-screening.component';

@NgModule({
  declarations: [
    AddMovieComponent,
    ManagementComponent,
    MovieCardComponent,
    MovieManagementComponent,
    ScreeningManagementComponent,
    ScreeningCardComponent,
    AddScreeningComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
})
export class CinemaManagementModule {}
