import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MovieService } from 'src/app/modules/shared/services/movie.service';
import firebase from 'firebase';
import { Router } from '@angular/router';
import { MovieAutocomplete } from '../../generic/movie-autocomplete.class';

@Component({
  selector: 'app-add-screening',
  templateUrl: './add-screening.component.html',
  styleUrls: ['./add-screening.component.scss'],
})
export class AddScreeningComponent implements OnInit {
  addScreeningFormGroup = new FormGroup({
    movie: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    time: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
  });

  movieAutocomplete = new MovieAutocomplete(this.movieService);

  constructor(
    private movieService: MovieService,
    private afs: AngularFirestore,
    private router: Router
  ) {}

  ngOnInit(): void {
    const movieControl = this.addScreeningFormGroup.get('movie') as FormControl;
    this.movieAutocomplete.initAutocomplete(movieControl);
  }

  handleFormSubmit(event: Event): void {
    if (!this.addScreeningFormGroup.valid) {
      event.preventDefault();
    }
  }

  uploadScreening(): void {
    const formValue = this.addScreeningFormGroup.value;
    const movie = this.movieAutocomplete.movies.find(
      (movie) => movie.name === formValue.movie
    );

    const time = formValue.time.split(':');
    const date = new Date(formValue.date);
    date.setHours(time[0]);
    date.setMinutes(time[1]);

    const timestamp = firebase.firestore.Timestamp.fromDate(date);
    const movieRef = firebase.firestore().doc('/movies/' + movie.id);

    const screening = {
      movie: movieRef,
      datetime: timestamp,
      price: parseInt(formValue.price, 10),
      occupiedSeats: [] as number[],
    };

    this.afs
      .collection('screenings')
      .add(screening)
      .then(() => {
        this.router.navigateByUrl('/cinema-management/screenings');
      });
  }
}
