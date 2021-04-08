import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private afs: AngularFirestore) {}

  fetchData(): Observable<Movie[]> {
    const query$ = this.afs.collection('movies').valueChanges() as Observable<
      Movie[]
    >;

    return query$.pipe(first());
  }
}
