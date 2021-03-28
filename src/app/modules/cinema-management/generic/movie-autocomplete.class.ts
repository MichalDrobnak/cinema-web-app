import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, tap } from 'rxjs/operators';
import { Movie } from '../../shared/models/movie.model';
import { MovieService } from '../../shared/services/movie.service';

export class MovieAutocomplete {
  movies: Movie[];
  filteredOptions$: Observable<Movie[]>;
  private movieNames: string[];

  constructor(private movieService: MovieService) {}

  initAutocomplete(movieControl: FormControl): void {
    this.fetchMovies().subscribe(() => {
      this.initValidators(movieControl);
      this.observeFormControl(movieControl);
    });
  }

  private initValidators(movieControl: FormControl): void {
    movieControl.setValidators([
      this.requireMatch.bind(movieControl) as ValidatorFn,
    ]);
  }

  private fetchMovies(): Observable<any> {
    return this.movieService.fetchAllMovies().pipe(
      tap((fetchedMovies) => {
        this.movies = fetchedMovies;
        this.movieNames = fetchedMovies.map((movie) => movie.name);
      })
    );
  }

  private observeFormControl(movieControl: FormControl): void {
    this.filteredOptions$ = movieControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterOptions(value))
    );
  }

  private filterOptions(value: string): Movie[] {
    const filterValue = value.toLowerCase();

    return this.movies.filter((movie: Movie) =>
      movie.lowercaseName.includes(filterValue)
    );
  }

  private requireMatch = (control: FormControl): ValidationErrors | null => {
    const selection: any = control.value;

    if (
      this.movieNames &&
      this.movieNames.indexOf(selection) < 0 &&
      selection
    ) {
      return { requireMatch: true };
    }
    return null;
  };
}
