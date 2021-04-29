import { Component, Input, OnInit } from '@angular/core';
import { Ticket } from 'src/app/modules/shared/models/ticket.model';
import firebase from 'firebase';

@Component({
  selector: 'app-ticket-card',
  templateUrl: './ticket-card.component.html',
  styleUrls: ['./ticket-card.component.scss'],
})
export class TicketCardComponent implements OnInit {
  @Input() data: Ticket;

  posterUrl: string;
  private storageRef = firebase.storage().ref();

  constructor() {}

  ngOnInit(): void {
    this.getPosterUrl();
  }

  private getPosterUrl(): void {
    this.storageRef
      .child(this.data.screening.movie.image)
      .getDownloadURL()
      .then((url) => {
        this.posterUrl = `url("${url}")`;
      });
  }
}
