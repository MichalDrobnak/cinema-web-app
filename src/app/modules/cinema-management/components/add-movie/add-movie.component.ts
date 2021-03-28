import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, of, Subject } from 'rxjs';
import { catchError, mergeMapTo, takeUntil } from 'rxjs/operators';
import firebase from 'firebase';
import { Router } from '@angular/router';
import { Movie } from 'src/app/modules/shared/models/movie.model';
import { MovieService } from 'src/app/modules/shared/services/movie.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss'],
})
export class AddMovieComponent implements OnInit, OnDestroy {
  addMovieFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    length: new FormControl('', [Validators.required]),
    genre: new FormControl('', [Validators.required]),
    minimalAge: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  });

  visible = true;
  selectable = false;
  removable = true;
  addOnBlur = false;

  genres: Genre[] = [];
  poster: File;

  editedMovie: Movie;

  destroy$ = new Subject<void>();

  private storageRef = firebase.storage().ref();
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private movieService: MovieService
  ) {}
  ngOnDestroy(): void {
    this.movieService.editedMovie = null;

    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.editedMovie = this.movieService.editedMovie;

    if (this.editedMovie) {
      const { id, lowercaseName, genre, ...movie } = this.editedMovie;

      if (genre) {
        const genreInput = this.addMovieFormGroup.get('genre');
        genreInput.setValue('...');
        genreInput.clearValidators();
      }

      this.genres = genre.map((g: string) => ({ name: g } as Genre));
      this.addMovieFormGroup.setValue({
        genre: '',
        ...movie,
      });
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      const trimmed = value.trim();
      const capitalized = trimmed[0].toUpperCase() + trimmed.slice(1);
      this.genres.push({ name: capitalized });
    }
    if (input) {
      input.value = '';
    }
  }

  remove(genreToRemove: Genre): void {
    this.genres = this.genres.filter((genre) => genre != genreToRemove);
  }

  handleFileChange(file: File): void {
    if (file) {
      this.addMovieFormGroup.controls.image.setErrors(null);
    } else {
      this.addMovieFormGroup.controls.image.setErrors({ required: true });
    }
    this.poster = file;
  }

  uploadMovie() {
    const movieUpload$ = this.uploadPoster(this.poster);

    movieUpload$.pipe(
      mergeMapTo(this.afs.collection('movies').add({ ...this.getMovieData() }))
    );

    movieUpload$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.router.navigateByUrl('/cinema-management');
    });
  }

  handleFormSubmit(event: Event): void {
    if (!this.addMovieFormGroup.valid) {
      event.preventDefault();
    }
  }

  editMovie(): void {
    const movieEdit$ = this.poster ? this.uploadPoster(this.poster) : of({});

    movieEdit$
      .pipe(
        mergeMapTo(
          this.afs
            .collection('movies')
            .doc(this.editedMovie.id)
            .update({ ...this.getMovieData() })
        )
      )
      .pipe(takeUntil(this.destroy$), mergeMapTo(this.deleteOldPoster()))
      .subscribe(() => {
        this.router.navigateByUrl('/cinema-management');
      });
  }

  private deleteOldPoster(): Observable<any> {
    return this.poster
      ? from(this.storageRef.child(this.editedMovie.image).delete()).pipe(
          catchError((err) => of(err))
        )
      : of({});
  }

  private uploadPoster(
    poster: File
  ): Observable<firebase.storage.UploadTaskSnapshot> {
    const ref = this.storageRef.child(`posters/${poster.name}`);
    return from(ref.put(poster));
  }

  private getMovieData(): Movie {
    const { genre: a, image: b, ...restOfData } = this.addMovieFormGroup.value;
    const lowercaseName = restOfData.name.toLowerCase();

    const genre = this.genres.map((genre) => genre.name.toLowerCase());
    const posterPath = this.poster
      ? `posters/${this.poster.name}`
      : this.addMovieFormGroup.value.image;
    const image = posterPath;

    return { lowercaseName, genre, image, ...restOfData };
  }
}

export interface Genre {
  name: string;
}
