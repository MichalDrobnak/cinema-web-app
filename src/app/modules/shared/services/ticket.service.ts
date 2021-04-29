import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { forkJoin, from, Observable, of, throwError } from 'rxjs';
import {
  concatAll,
  first,
  map,
  mergeMap,
  mergeMapTo,
  pluck,
  tap,
  toArray,
} from 'rxjs/operators';
import { Spectator } from 'src/app/modules/shared/models/spectator.model';
import firebase from 'firebase';
import { AuthService } from '../../authentication/services/auth.service';
import { RawTicket, Ticket } from '../models/ticket.model';
import { ScreeningService } from './screening.service';

export type FirestoreRef = firebase.firestore.DocumentReference;

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private screeningService: ScreeningService
  ) {}

  buyTickets(
    spectators: Spectator[],
    screeningID: string,
    userID: string,
    ticketPrice: number
  ): Observable<any> {
    const screeningRef = firebase.firestore().doc('screenings/' + screeningID);

    return this.subtractCredit(userID, ticketPrice).pipe(
      mergeMapTo(
        of(spectators).pipe(
          concatAll(),
          mergeMap((spectator) => {
            return this.occupySeat(screeningRef, spectator).pipe(
              mergeMapTo(this.createSpectator(spectator))
            );
          }),
          toArray(),
          mergeMap((spectatorRefs) =>
            this.createTicket(spectatorRefs, screeningRef)
          ),
          mergeMap((ticketRef) => this.addTicketToUser(ticketRef, userID))
        )
      )
    );
  }

  fetchTickets(): Observable<Ticket[]> {
    return this.fetchRawTickets().pipe(
      mergeMap((rawTickets) => this.buildTickets(rawTickets))
    );
  }

  private fetchRawTickets(): Observable<RawTicket[]> {
    return this.auth.userData$.pipe(
      pluck('tickets'),
      first(),
      concatAll(),
      mergeMap((ticketRef: FirestoreRef) => ticketRef.get()),
      map((snap) => snap.data() as RawTicket),
      toArray()
    );
  }

  private buildTickets(rawTickets: RawTicket[]): Observable<Ticket[]> {
    return of(rawTickets).pipe(
      concatAll(),
      mergeMap((rawTicket) =>
        forkJoin({
          screening: this.screeningService.fetchScreeningByRef(
            rawTicket.screening
          ),
          spectators: this.fetchSpectators(rawTicket.spectators),
        })
      ),
      toArray()
    );
  }

  private fetchSpectators(
    spectatorRefs: FirestoreRef[]
  ): Observable<Spectator[]> {
    return of(spectatorRefs).pipe(
      concatAll(),
      mergeMap((ref) => ref.get()),
      map((snap) => snap.data() as Spectator),
      toArray()
    );
  }

  private addTicketToUser(ticketRef: FirestoreRef, userID: string): any {
    return this.afs
      .collection('users')
      .doc(userID)
      .update({
        tickets: firebase.firestore.FieldValue.arrayUnion(
          firebase.firestore().doc('tickets/' + ticketRef.id)
        ),
      });
  }

  private createTicket(
    spectatorRefs: FirestoreRef[],
    screeningRef: FirestoreRef
  ): Observable<FirestoreRef> {
    return from(
      this.afs
        .collection('tickets')
        .add({ screening: screeningRef, spectators: spectatorRefs })
    );
  }

  private createSpectator(spectator: Spectator): Observable<FirestoreRef> {
    return from(this.afs.collection('spectators').add(spectator)).pipe(
      map((docRef) => firebase.firestore().doc('spectators/' + docRef.id))
    );
  }

  private occupySeat(
    screeningRef: FirestoreRef,
    spectator: Spectator
  ): Observable<any> {
    return from(
      screeningRef.update({
        occupiedSeats: firebase.firestore.FieldValue.arrayUnion(spectator.seat),
      })
    );
  }

  private subtractCredit(userID: string, ticketPrice: number): Observable<any> {
    const userRef = this.afs.collection('users').doc(userID);

    return from(userRef.get()).pipe(
      mergeMap((userData: any) => {
        const newCredit = userData.data().credit - ticketPrice;
        console.log('new credit: ', newCredit);
        console.log(userData.data());

        if (newCredit >= 0) {
          return userRef.update({ credit: newCredit });
        } else {
          return throwError({ msg: 'Not enough credit.' });
        }
      })
    );
  }
}
