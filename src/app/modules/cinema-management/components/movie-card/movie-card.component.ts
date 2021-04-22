import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Movie } from 'src/app/modules/shared/models/movie.model';
import firebase from 'firebase';
import { MatDialog } from '@angular/material/dialog';
import { CertainityCheckComponent } from '../../../shared/components/certainity-check/certainity-check.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { MovieService } from 'src/app/modules/shared/services/movie.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  animations: [
    trigger('showDesc', [
      state(
        'closed',
        style({ height: '0px', paddingTop: '0', paddingBottom: '0' })
      ),
      transition('open <=> closed', animate('0.5s ease')),
    ]),
  ],
})
export class MovieCardComponent implements OnInit, OnDestroy {
  @Input('data') data: Movie;

  isDescriptionHidden = true;
  posterUrl: string;

  destroy$ = new Subject<void>();

  private storageRef = firebase.storage().ref();

  constructor(
    private dialog: MatDialog,
    private afs: AngularFirestore,
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPosterUrl();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  triggerDescription(): void {
    this.isDescriptionHidden = !this.isDescriptionHidden;
  }

  getPosterUrl(): void {
    this.storageRef
      .child(this.data.image)
      .getDownloadURL()
      .then((url) => {
        this.posterUrl = `url("${url}")`;
      });
  }

  handleDelete(): void {
    this.dialog
      .open(CertainityCheckComponent)
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.deleteMovie();
        }
      });
  }

  handleEdit(): void {
    this.movieService.editedMovie = this.data;
    this.router.navigateByUrl('/add-movie');
  }

  deleteMovie(): void {
    this.afs
      .collection('movies')
      .doc(this.data.id)
      .delete()
      .then(() => {});
  }
}
