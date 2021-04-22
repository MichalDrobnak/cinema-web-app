import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataCollection } from 'src/app/modules/shared/models/collection.model';
import { Movie } from 'src/app/modules/shared/models/movie.model';
import { MovieService } from 'src/app/modules/shared/services/movie.service';
import { WithPaginator } from '../../generic/with-paginator.class';

@Component({
  selector: 'app-movie-management',
  templateUrl: './movie-management.component.html',
  styleUrls: ['./movie-management.component.scss'],
})
export class MovieManagementComponent
  extends WithPaginator<Movie>
  implements OnInit, OnDestroy {
  filterGroup = new FormGroup({
    name: new FormControl('', []),
    genre: new FormControl('', []),
  });
  movies$: Observable<DataCollection<Movie>>;

  nameFilter: string;
  genreFilter: string;

  destroy$ = new Subject<void>();

  constructor(private movieService: MovieService) {
    super();
  }

  ngOnInit(): void {
    this.fetchData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  fetchData(start?: Movie, end?: Movie): void {
    this.movies$ = this.movieService.fetchData(
      this.pageSize,
      start,
      end,
      this.nameFilter,
      this.genreFilter
    );

    this.movies$.pipe(takeUntil(this.destroy$)).subscribe((collection) => {
      this.firstInResponse = collection.data[0];
      this.lastInResponse = collection.data[collection.data.length - 1];
    });
  }

  identifyMovie(index: number, item: Movie): string {
    return item.id;
  }

  applyFilter(): void {
    this.nameFilter = this.filterGroup.value.name;
    this.genreFilter = this.filterGroup.value.genre;
    this.pageIndex = 0;
    this.fetchData();
  }
}
