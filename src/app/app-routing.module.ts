import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './modules/authentication/components/sign-in/sign-in.component';
import { SignUpComponent } from './modules/authentication/components/sign-up/sign-up.component';
import { DashboardComponent } from './modules/dashboard/components/dashboard/dashboard.component';
import { ManagementComponent } from './modules/cinema-management/components/management/management.component';
import { MovieManagementComponent } from './modules/cinema-management/components/movie-management/movie-management.component';
import { ScreeningManagementComponent } from './modules/cinema-management/components/screening-management/screening-management.component';
import { AdminGuard } from './modules/authentication/guards/admin.guard';
import { AddMovieComponent } from './modules/cinema-management/components/add-movie/add-movie.component';
import { AddScreeningComponent } from './modules/cinema-management/components/add-screening/add-screening.component';
import { BuyTicketPageComponent } from './modules/ticket-buying/components/buy-ticket-page/buy-ticket-page.component';
import { AddCreditComponent } from './modules/user-interaction/components/add-credit/add-credit.component';
import { MyTicketsComponent } from './modules/user-interaction/components/my-tickets/my-tickets.component';

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
    path: 'add-screening',
    component: AddScreeningComponent,
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
  { path: 'buy-tickets/:screeningId', component: BuyTicketPageComponent },
  { path: 'add-credit', component: AddCreditComponent },
  { path: 'my-tickets', component: MyTicketsComponent },
  { path: '*', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
