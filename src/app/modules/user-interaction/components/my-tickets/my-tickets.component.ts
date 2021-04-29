import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from 'src/app/modules/shared/models/ticket.model';
import { TicketService } from 'src/app/modules/shared/services/ticket.service';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.scss'],
})
export class MyTicketsComponent implements OnInit {
  tickets$: Observable<Ticket[]>;

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.tickets$ = this.ticketService.fetchTickets();
  }
}
