import firebase from 'firebase';

export interface Movie {
  description: string;
  genre: firebase.firestore.DocumentReference[];
  image: string;
  length: number;
  minimalAge: number;
  name: string;
}
