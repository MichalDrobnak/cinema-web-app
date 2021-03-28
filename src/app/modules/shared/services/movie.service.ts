import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Movie } from '../models/movie.model';
import { DataCollection } from '../models/collection.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private afs: AngularFirestore) {}

  editedMovie: Movie;

  fetchData(
    pageSize: number,
    start?: Movie,
    end?: Movie,
    name?: string,
    genre?: string
  ): Observable<DataCollection<Movie>> {
    const query$ = this.afs
      .collection('movies', (ref) => {
        let reference = ref.orderBy('name', 'asc');

        if (name) {
          reference = reference.where(
            'lowercaseName',
            '==',
            name.toLowerCase()
          );
        }
        if (genre) {
          reference = reference.where('genre', 'array-contains', genre);
        }
        if (start) {
          reference = reference.startAfter(start.name).limit(pageSize);
        }
        if (end) {
          reference = reference.endBefore(end.name).limitToLast(pageSize);
        }
        if (!start && !end) {
          reference = reference.limit(pageSize);
        }

        return reference;
      })
      .valueChanges({ idField: 'id' }) as Observable<Movie[]>;

    const collection$ = query$.pipe(
      mergeMap((movies: Movie[]) =>
        this.fetchCollectionSize(movies, name, genre)
      )
    );

    return collection$ as Observable<DataCollection<Movie>>;
  }

  fetchCollectionSize(
    movies: Movie[],
    name?: string,
    genre?: string
  ): Observable<DataCollection<Movie>> {
    const size$ = from(
      this.afs
        .collection('movies', (ref) => {
          let reference = ref.orderBy('name', 'asc');

          if (name) {
            reference = reference.where(
              'lowercaseName',
              '==',
              name.toLowerCase()
            );
          }
          if (genre) {
            reference = reference.where('genre', 'array-contains', genre);
          }

          return reference;
        })
        .get()
    );
    return size$.pipe(
      map(
        (snap) => ({ size: snap.size, data: movies } as DataCollection<Movie>)
      )
    );
  }

  fetchAllMovies(): Observable<Movie[]> {
    return this.afs
      .collection('movies')
      .valueChanges({ idField: 'id' }) as Observable<Movie[]>;
  }
}
