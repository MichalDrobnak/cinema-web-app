import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/modules/authentication/services/auth.service';
import { Screening } from 'src/app/modules/shared/models/screening.model';
import { ScreeningService } from 'src/app/modules/shared/services/screening.service';
import { TicketService } from 'src/app/modules/shared/services/ticket.service';
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
    age: new FormControl(''),
    seat: new FormControl('', Validators.required),
  });

  screening$: Observable<Screening>;

  spectators: Spectator[] = [];
  ticketPrice: number;
  minAge: number;
  screeningID: string;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private screeningService: ScreeningService,
    private ticketService: TicketService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.screeningID = routeParams.get('screeningId');

    this.screening$ = this.screeningService.fetchScreeningById(
      this.screeningID
    );
    this.setScreeningData();
  }

  setScreeningData(): void {
    this.screening$.pipe(first()).subscribe((screening) => {
      this.setMinAgeValidator(screening.movie.minimalAge);
      this.ticketPrice = screening.price;
      this.minAge = screening.movie.minimalAge;
    });
  }

  setMinAgeValidator(minAge: number): void {
    const ageControl = this.spectatorGroup.get('age');

    ageControl.setValidators([Validators.required, Validators.min(minAge)]);
  }

  handleFormSubmit(e: Event): void {
    if (!this.spectatorGroup.valid) {
      e.preventDefault();
    }
  }

  pickSeat(): void {
    const dialogRef = this.dialog.open(PickSeatComponent, {
      data: {
        screening$: this.screening$,
        spectators: this.spectators,
        selectedSeat: this.spectatorGroup.get('seat').value,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(first())
      .subscribe((result) => {
        if (result) {
          this.spectatorGroup.get('seat').setValue(result);
        }
      });
  }

  getSeatValue(): number {
    return this.spectatorGroup.get('seat').value;
  }

  addSpectator(): void {
    const { name, surname, ...spectator } = this.spectatorGroup.value;

    this.spectators.push({
      name: name.trim(),
      surname: surname.trim(),
      ...spectator,
    });
    this.spectatorGroup.reset();
  }

  calculatePrice(): number {
    return this.spectators.length * this.ticketPrice;
  }

  removeSpectator(spectator: Spectator): void {
    this.spectators = this.spectators.filter((s) => s !== spectator);
  }

  getNameError(): string {
    const nameControl = this.spectatorGroup.get('name');

    if (nameControl.hasError('required')) {
      return 'Meno diváka je povinné.';
    }
    return null;
  }

  getSurnameError(): string {
    const surnameControl = this.spectatorGroup.get('surname');

    if (surnameControl.hasError('required')) {
      return 'Priezvisko diváka je povinné.';
    }
    return null;
  }

  getAgeError(): string {
    const ageControl = this.spectatorGroup.get('age');

    if (ageControl.hasError('required')) {
      return 'Vek diváka je povinný.';
    } else if (ageControl.hasError('min')) {
      return `Minimálny vek diváka je ${this.minAge} rokov`;
    }
    return null;
  }

  canBuy(): boolean {
    return this.spectators.length > 0;
  }

  buyTickets(): void {
    this.authService.userData$.pipe(first()).subscribe((user) => {
      this.ticketService.createTicket(
        this.spectators,
        this.screeningID,
        user.uid
      );
    });
  }
}

export interface Spectator {
  name: string;
  surname: string;
  age: number;
  seat: number;
}
