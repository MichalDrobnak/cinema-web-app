import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ScreeningComponent } from './components/screening/screening.component';
import { ScreeningDetailComponent } from './components/screening-detail/screening-detail.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [
    DashboardComponent,
    ScreeningComponent,
    ScreeningDetailComponent,
  ],
  imports: [CommonModule, SharedModule, MaterialModule, AppRoutingModule],
})
export class DashboardModule {}
