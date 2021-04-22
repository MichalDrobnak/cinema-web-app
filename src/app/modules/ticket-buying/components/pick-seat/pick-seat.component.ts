import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Screening } from 'src/app/modules/shared/models/screening.model';

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
    @Inject(MAT_DIALOG_DATA) public data: Observable<Screening>
  ) {
    this.data.pipe(takeUntil(this.destroy$)).subscribe((screening) => {
      this.resetSeats();

      screening.occupiedSeats.forEach((seat) => {
        if (seat === this.selectedSeat) {
          this.selectedSeat = null;
        }
        this.seats[seat - 1].isOccupied = true;
      });
    });
  }

  ngOnInit(): void {
    this.generateSeats();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  selectSeat(number: number): void {
    if (this.selectedSeat === number) {
      this.selectedSeat = null;
    } else if (!this.seats[number - 1].isOccupied) {
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
      seat.isOccupied = false;
    });
  }

  private generateSeats(): void {
    for (let i = 1; i < 53; i++) {
      this.seats.push({ number: i, isOccupied: false });
    }
  }
}

export interface Seat {
  number: number;
  isOccupied: boolean;
}
