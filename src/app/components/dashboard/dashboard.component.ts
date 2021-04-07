import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Screening } from 'src/app/models/screening.model';
import { AuthService } from 'src/app/services/auth.service';
import { ScreeningService } from 'src/app/services/screening.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    public auth: AuthService,
    private screeningService: ScreeningService
  ) {}

  screenings$: Observable<Screening[]>;

  ngOnInit(): void {
    this.screenings$ = this.screeningService.fetchData();
  }
}
