import { Component, Input, OnInit } from '@angular/core';
import firebase from 'firebase';
import { Screening } from 'src/app/modules/shared/models/screening.model';

@Component({
  selector: 'app-screening-card',
  templateUrl: './screening-card.component.html',
  styleUrls: ['./screening-card.component.scss'],
})
export class ScreeningCardComponent implements OnInit {
  @Input('data') data: Screening;

  posterUrl: string;
  private storageRef = firebase.storage().ref();

  constructor() {}

  ngOnInit(): void {
    this.getPosterUrl();
  }

  handleDelete(): void {}

  private getPosterUrl(): void {
    this.storageRef
      .child(this.data.movie.image)
      .getDownloadURL()
      .then((url) => {
        this.posterUrl = `url("${url}")`;
      });
  }
}
