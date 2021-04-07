import firebase from 'firebase';
import { Movie } from './movie.model';

export interface RawScreening {
  datetime: {
    seconds: number;
    nanoseconds: number;
  };
  price: number;
  movie: firebase.firestore.DocumentReference;
}

export interface Screening {
  datetime: firebase.firestore.Timestamp;
  price: number;
  movie: Movie;
}
