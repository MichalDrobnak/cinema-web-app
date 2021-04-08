import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManagementComponent } from './components/management/management.component';
import { MovieManagementComponent } from './components/movie-management/movie-management.component';
import { ScreeningManagementComponent } from './components/screening-management/screening-management.component';
import { AdminGuard } from './guards/admin.guard';
import { AddMovieComponent } from './components/add-movie/add-movie.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'add-movie',
    component: AddMovieComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'cinema-management',
    component: ManagementComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'movies', pathMatch: 'full' },
      { path: 'movies', component: MovieManagementComponent },
      { path: 'screenings', component: ScreeningManagementComponent },
    ],
  },
  { path: '*', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
