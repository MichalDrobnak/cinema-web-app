import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyTicketPageComponent } from './components/buy-ticket-page/buy-ticket-page.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PickSeatComponent } from './components/pick-seat/pick-seat.component';

@NgModule({
  declarations: [BuyTicketPageComponent, PickSeatComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class TicketBuyingModule {}
