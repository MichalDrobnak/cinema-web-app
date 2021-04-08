import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { concatAll, first, map, mergeMap, toArray } from 'rxjs/operators';
import { RawScreening, Screening } from '../models/screening.model';

@Injectable({
  providedIn: 'root',
})
export class ScreeningService {
  constructor(private afs: AngularFirestore) {}

  fetchData(): Observable<Screening[]> {
    const query$ = this.afs
      .collection('screenings')
      .valueChanges() as Observable<RawScreening[]>;

    return query$.pipe(
      first(),
      concatAll(),
      mergeMap((screening) => this.getScreening(screening)),
      toArray()
    );
  }

  private getScreening(screening: RawScreening): Observable<Screening> {
    const movieRef = screening.movie;

    return from(movieRef.get()).pipe(
      map((movieDoc) => {
        return { ...screening, movie: movieDoc.data() } as Screening;
      })
    );
  }
}
