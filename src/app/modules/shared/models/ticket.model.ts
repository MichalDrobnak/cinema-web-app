import { Screening } from './screening.model';
import { Spectator } from './spectator.model';
import firebase from 'firebase';

export interface Ticket {
  screening: Screening;
  spectators: Spectator[];
}

export interface RawTicket {
  screening: firebase.firestore.DocumentReference;
  spectators: firebase.firestore.DocumentReference[];
}
