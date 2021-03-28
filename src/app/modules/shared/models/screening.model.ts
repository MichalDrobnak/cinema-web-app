import firebase from 'firebase';
import { Movie } from './movie.model';

export interface RawScreening {
  id: string;
  datetime: firebase.firestore.Timestamp;
  price: number;
  movie: firebase.firestore.DocumentReference;
  occupiedSeats: number[];
}

export interface Screening {
  id: string;
  datetime: firebase.firestore.Timestamp;
  price: number;
  movie: Movie;
  occupiedSeats: number[];
}
