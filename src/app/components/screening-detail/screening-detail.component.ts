import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Screening } from 'src/app/models/screening.model';
import firebase from 'firebase';

@Component({
  selector: 'app-screening-detail',
  templateUrl: './screening-detail.component.html',
  styleUrls: ['./screening-detail.component.scss'],
})
export class ScreeningDetailComponent {
  private storageRef = firebase.storage().ref();
  posterUrl: string;

  constructor(
    public dialogRef: MatDialogRef<ScreeningDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Screening
  ) {}

  ngOnInit(): void {
    this.getPosterSrc();
  }

  getPosterSrc(): void {
    this.storageRef
      .child(this.data.movie.image)
      .getDownloadURL()
      .then((url) => {
        this.posterUrl = url;
      });
  }
}
