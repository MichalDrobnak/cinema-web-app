import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AddCreditComponent } from './components/add-credit/add-credit.component';
import { CardReaderComponent } from './components/card-reader/card-reader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyTicketsComponent } from './components/my-tickets/my-tickets.component';
import { TicketCardComponent } from './components/ticket-card/ticket-card.component';

@NgModule({
  declarations: [AddCreditComponent, CardReaderComponent, MyTicketsComponent, TicketCardComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class UserInteractionModule {}
