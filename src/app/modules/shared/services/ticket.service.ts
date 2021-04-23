import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, of } from 'rxjs';
import { concatAll, map, mergeMap, toArray } from 'rxjs/operators';
import { Spectator } from '../../ticket-buying/components/buy-ticket-page/buy-ticket-page.component';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor(private afs: AngularFirestore) {}

  createTicket(spectators: Spectator[], screeningID: string, userID: string) {
    of(spectators)
      .pipe(
        concatAll(),
        mergeMap((spectator) =>
          from(this.afs.collection('spectators').add(spectator)).pipe(
            map((docRef) => firebase.firestore().doc('spectators/' + docRef.id))
          )
        ),
        toArray(),
        mergeMap((spectatorRefs) => {
          const screeningRef = firebase
            .firestore()
            .doc('screenings/' + screeningID);
          return from(
            this.afs
              .collection('tickets')
              .add({ screening: screeningRef, spectators: spectatorRefs })
          );
        }),
        mergeMap((docRef) =>
          this.afs
            .collection('users')
            .doc(userID)
            .update({
              tickets: firebase.firestore.FieldValue.arrayUnion(
                firebase.firestore().doc('tickets/' + docRef.id)
              ),
            })
        )
      )
      .subscribe();
  }
}
