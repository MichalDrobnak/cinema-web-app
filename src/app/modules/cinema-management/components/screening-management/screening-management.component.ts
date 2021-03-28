import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { DataCollection } from 'src/app/modules/shared/models/collection.model';
import { Screening } from 'src/app/modules/shared/models/screening.model';
import { MovieService } from 'src/app/modules/shared/services/movie.service';
import { ScreeningService } from 'src/app/modules/shared/services/screening.service';
import { MovieAutocomplete } from '../../generic/movie-autocomplete.class';
import { WithPaginator } from '../../generic/with-paginator.class';
import firebase from 'firebase';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-screening-management',
  templateUrl: './screening-management.component.html',
  styleUrls: ['./screening-management.component.scss'],
})
export class ScreeningManagementComponent
  extends WithPaginator<Screening>
  implements OnInit, OnDestroy {
  filterGroup = new FormGroup({
    movie: new FormControl('', []),
    price: new FormControl('', []),
  });

  screenings$: Observable<DataCollection<Screening>>;

  movieFilter: firebase.firestore.DocumentReference;
  priceFilter: number;

  movieAutocomplete = new MovieAutocomplete(this.movieService);

  destroy$ = new Subject<void>();

  constructor(
    private screeningService: ScreeningService,
    private movieService: MovieService
  ) {
    super();
  }

  ngOnInit(): void {
    this.fetchData();

    const movieControl = this.filterGroup.get('movie') as FormControl;
    this.movieAutocomplete.initAutocomplete(movieControl);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  fetchScreenings(): void {}

  applyFilter(): void {
    const movieControl = this.filterGroup.get('movie') as FormControl;
    const movie = this.movieAutocomplete.movies.find(
      (movie) => movie.name === movieControl.value
    );

    this.movieFilter = movie
      ? firebase.firestore().doc('/movies/' + movie.id)
      : null;
    this.priceFilter = parseInt(this.filterGroup.value.price);
    this.pageIndex = 0;
    this.fetchData();
  }

  identifyScreening(index: number, item: Screening): string {
    return item.id;
  }

  fetchData(start?: Screening, end?: Screening): void {
    this.screenings$ = this.screeningService.fetchData(
      this.pageSize,
      start,
      end,
      this.movieFilter,
      this.priceFilter
    );

    this.screenings$.pipe(takeUntil(this.destroy$)).subscribe((collection) => {
      this.firstInResponse = collection.data[0];
      this.lastInResponse = collection.data[collection.data.length - 1];
    });
  }
}
