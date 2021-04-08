import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { mergeMapTo } from 'rxjs/operators';
import firebase from 'firebase';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss'],
})
export class AddMovieComponent implements OnInit {
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

  private storageRef = firebase.storage().ref();
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private afs: AngularFirestore) {}

  ngOnInit(): void {}

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
    const {
      name,
      length,
      minimalAge,
      description,
    } = this.addMovieFormGroup.value;
    const genre = this.genres.map((genre) => genre.name);
    const image = `posters/${this.poster.name}`;

    movieUpload$.pipe(
      mergeMapTo(
        this.afs.collection('movies').add({
          name,
          length,
          genre,
          minimalAge,
          description,
          image,
        })
      )
    );

    movieUpload$.subscribe((res) => console.log(res));
  }

  handleFormSubmit(event: Event): void {
    if (!this.addMovieFormGroup.valid) {
      event.preventDefault();
    }
  }

  private uploadPoster(
    poster: File
  ): Observable<firebase.storage.UploadTaskSnapshot> {
    const ref = this.storageRef.child(`posters/${poster.name}`);
    return from(ref.put(poster));
  }
}

export interface Genre {
  name: string;
}
