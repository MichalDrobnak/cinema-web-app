import { Component, Input, OnInit } from '@angular/core';
import { Screening } from 'src/app/models/screening.model';
import firebase from 'firebase';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ScreeningDetailComponent } from '../screening-detail/screening-detail.component';

@Component({
  selector: 'app-screening',
  templateUrl: './screening.component.html',
  styleUrls: ['./screening.component.scss'],
})
export class ScreeningComponent implements OnInit {
  /**
   * Data about the screening.
   */
  @Input('data') data: Screening;

  private storageRef = firebase.storage().ref();
  posterUrl: string;

  constructor(public auth: AuthService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getPosterSrc();
  }

  getPosterSrc(): void {
    this.storageRef
      .child(this.data.movie.image)
      .getDownloadURL()
      .then((url) => {
        this.posterUrl = `url("${url}")`;
      });
  }

  openDetail(): void {
    this.dialog.open(ScreeningDetailComponent, {
      data: this.data,
    });
  }
}
