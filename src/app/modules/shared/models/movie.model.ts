import firebase from 'firebase';

export interface Movie {
  id: string;
  description: string;
  genre: string[];
  image: string;
  length: number;
  minimalAge: number;
  name: string;
  lowercaseName: string;
}
