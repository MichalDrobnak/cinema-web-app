import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit(): void {}

  logUser(): void {
    this.auth.userData$.pipe(first()).subscribe((val) => console.log(val));
  }
}
