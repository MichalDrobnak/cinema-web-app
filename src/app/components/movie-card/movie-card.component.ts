import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import firebase from 'firebase';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  animations: [
    trigger('showDesc', [
      state(
        'closed',
        style({ height: '0px', paddingTop: '0', paddingBottom: '0' })
      ),
      transition('open <=> closed', animate('0.5s ease')),
    ]),
  ],
})
export class MovieCardComponent implements OnInit {
  @Input('data') data: Movie;

  isDescriptionHidden = true;
  posterUrl: string;

  private storageRef = firebase.storage().ref();

  constructor() {}

  ngOnInit(): void {
    this.getPosterUrl();
  }

  triggerDescription(): void {
    this.isDescriptionHidden = !this.isDescriptionHidden;
  }

  getPosterUrl(): void {
    this.storageRef
      .child(this.data.image)
      .getDownloadURL()
      .then((url) => {
        this.posterUrl = `url("${url}")`;
        console.log(this.posterUrl);
      });
  }
}
