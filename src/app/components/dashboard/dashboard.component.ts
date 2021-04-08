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
  screenings$: Observable<Screening[]>;

  constructor(
    public auth: AuthService,
    private screeningService: ScreeningService
  ) {}

  ngOnInit(): void {
    this.screenings$ = this.screeningService.fetchData();
  }
}
