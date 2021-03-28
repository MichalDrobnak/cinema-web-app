import firebase from 'firebase';

export interface User {
  credit: number;
  isAdmin: boolean;
  notifications: firebase.firestore.DocumentReference[];
  tickets: firebase.firestore.DocumentReference[];
  uid: string;
  username: string;
}
