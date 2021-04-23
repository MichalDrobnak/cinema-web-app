import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Screening } from 'src/app/modules/shared/models/screening.model';
import { Spectator } from '../buy-ticket-page/buy-ticket-page.component';

@Component({
  selector: 'app-pick-seat',
  templateUrl: './pick-seat.component.html',
  styleUrls: ['./pick-seat.component.scss'],
})
export class PickSeatComponent implements OnInit, OnDestroy {
  rippleColor = 'rgba(50, 100, 220, 0.2)';

  seats: Seat[] = [];
  selectedSeat: number;

  destroy$ = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<PickSeatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Record<string, any>
  ) {}

  ngOnInit(): void {
    this.generateSeats();
    this.markOccupied();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  markOccupied(): void {
    this.data.screening$
      .pipe(takeUntil(this.destroy$))
      .subscribe((screening: Screening) => {
        this.resetSeats();

        screening.occupiedSeats.forEach((seat) => {
          if (seat === this.selectedSeat) {
            this.selectedSeat = null;
          }
          this.seats[seat - 1].state = SeatState.OCCUPIED;
        });
      });

    this.data.spectators.forEach((spectator: Spectator) => {
      this.seats[spectator.seat - 1].state = SeatState.MY;
    });

    this.selectedSeat = this.data.selectedSeat;
  }

  selectSeat(number: number): void {
    if (this.selectedSeat === number) {
      this.selectedSeat = null;
    } else if (!this.seats[number - 1].state) {
      this.selectedSeat = number;
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  finishSelection(): void {
    this.dialogRef.close(this.selectedSeat);
  }

  private resetSeats(): void {
    this.seats.forEach((seat) => {
      if (seat.state === SeatState.OCCUPIED) {
        seat.state = SeatState.FREE;
      }
    });
  }

  private generateSeats(): void {
    for (let i = 1; i < 53; i++) {
      this.seats.push({ number: i, state: SeatState.FREE });
    }
  }
}

export interface Seat {
  number: number;
  state: SeatState;
}

export enum SeatState {
  FREE,
  OCCUPIED,
  MY,
}
