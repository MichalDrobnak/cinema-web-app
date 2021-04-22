import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Screening } from 'src/app/modules/shared/models/screening.model';
import { ScreeningService } from 'src/app/modules/shared/services/screening.service';
import { PickSeatComponent } from '../pick-seat/pick-seat.component';

@Component({
  selector: 'app-buy-ticket-page',
  templateUrl: './buy-ticket-page.component.html',
  styleUrls: ['./buy-ticket-page.component.scss'],
})
export class BuyTicketPageComponent implements OnInit {
  spectatorGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
  });

  spectators: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private ScreeningService: ScreeningService,
    public dialog: MatDialog
  ) {}

  screening$: Observable<Screening>;

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const screeningId = routeParams.get('screeningId');

    this.screening$ = this.ScreeningService.fetchScreeningById(screeningId);
  }

  handleFormSubmit(e: Event): void {
    if (!this.spectatorGroup.valid) {
      e.preventDefault();
    }
  }

  pickSeat(): void {
    this.dialog.open(PickSeatComponent, {
      data: this.screening$,
    });
  }
}
