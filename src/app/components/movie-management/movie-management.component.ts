import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-management',
  templateUrl: './movie-management.component.html',
  styleUrls: ['./movie-management.component.scss'],
})
export class MovieManagementComponent implements OnInit {
  filterGroup = new FormGroup({
    name: new FormControl(),
    genre: new FormControl(),
  });
  movies$: Observable<Movie[]>;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movies$ = this.movieService.fetchData();
  }
}
