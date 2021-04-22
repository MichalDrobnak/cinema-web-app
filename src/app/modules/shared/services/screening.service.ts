import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { concatAll, first, map, mergeMap, toArray } from 'rxjs/operators';
import { DataCollection } from '../models/collection.model';
import { RawScreening, Screening } from '../models/screening.model';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class ScreeningService {
  constructor(private afs: AngularFirestore) {}

  fetchData(
    pageSize: number,
    start?: Screening,
    end?: Screening,
    movie?: firebase.firestore.DocumentReference,
    price?: number
  ): Observable<DataCollection<Screening>> {
    const query$ = this.afs
      .collection('screenings', (ref) => {
        let reference = ref.orderBy('datetime', 'asc');

        if (movie) {
          reference = reference.where('movie', '==', movie);
        }
        if (price) {
          reference = reference.where('price', '==', price);
        }
        if (start) {
          reference = reference.startAfter(start.datetime).limit(pageSize);
        }
        if (end) {
          reference = reference.endBefore(end.datetime).limitToLast(pageSize);
        }
        if (!start && !end) {
          reference = reference.limit(pageSize);
        }

        return reference;
      })
      .valueChanges({ idField: 'id' }) as Observable<RawScreening[]>;

    return query$
      .pipe(
        first(),
        concatAll(),
        mergeMap((screening) => this.getScreening(screening)),
        toArray()
      )
      .pipe(
        mergeMap((screenings) =>
          this.fetchCollectionSize(screenings, movie, price)
        )
      );
  }

  fetchAllScreenings(): Observable<Screening[]> {
    const query$ = this.afs
      .collection('screenings')
      .valueChanges({ idField: 'id' }) as Observable<RawScreening[]>;

    return query$.pipe(
      first(),
      concatAll(),
      mergeMap((screening) => this.getScreening(screening)),
      toArray()
    );
  }

  fetchScreeningById(id: string): Observable<Screening> {
    const query$ = this.afs
      .collection('screenings')
      .doc(id)
      .valueChanges() as Observable<RawScreening>;

    return query$.pipe(mergeMap((screening) => this.getScreening(screening)));
  }

  private getScreening(screening: RawScreening): Observable<Screening> {
    const movieRef = screening.movie;

    return from(movieRef.get()).pipe(
      map((movieDoc) => {
        return { ...screening, movie: movieDoc.data() } as Screening;
      })
    );
  }

  private fetchCollectionSize(
    screenings: Screening[],
    movie?: firebase.firestore.DocumentReference,
    price?: number
  ): Observable<DataCollection<Screening>> {
    const size$ = from(
      this.afs
        .collection('screenings', (ref) => {
          let reference = ref.orderBy('datetime', 'asc');

          if (movie) {
            reference = reference.where('movie', '==', movie);
          }
          if (price) {
            reference = reference.where('price', '==', price);
          }

          return reference;
        })
        .get()
    );
    return size$.pipe(
      map(
        (snap) =>
          ({ size: snap.size, data: screenings } as DataCollection<Screening>)
      )
    );
  }
}
