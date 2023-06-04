import {Component, OnInit} from '@angular/core';
import {ApiService} from "../api.service";
import {Movie} from "../models/Movie";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{

  // When we apply typecasting, we should check up all the codes related to the variable
  // api.service, model.ts, component should use same type
  // example : movies -> when ngOnInit gather 'data' the apiService 'getMovie' type should be 'Movie[]'
  // and 'movies', 'data' in ngOnInit
  movies: Movie[] = []
  selectedMovie: Movie | any ; // TODO fix this type
  editedMovie!: Movie | null | any;

  constructor(private apiService: ApiService,
              private cookieService: CookieService,
              private router: Router) {
  }
  ngOnInit(): void {

    const mrToken = this.cookieService.get('mr-token');
    if (!mrToken) {
      this.router.navigate(['/auth']);
    } else {
      this.apiService.getMovies().subscribe(
        (data: Movie[]) => {
          this.movies = data;
          console.log(this.movies)
        },
        error => console.log(error)
      );
    }
  }

  selectMovie(movie: Movie) {
    this.selectedMovie = movie;
    this.editedMovie = null;
    // console.log(this.selectedMovie)
  }

  editMovie(movie: Movie) {
    this.editedMovie = movie;
    this.selectedMovie = null;
  }

  createNewMovie() {
    this.editedMovie = {
      title: '',
      description: ''
    };
    this.selectedMovie = null;
  }

  deletedMovie(movie: Movie) {
    this.apiService.deleteMovie(movie.id).subscribe(
      result => {
        this.movies = this.movies.filter(mov => mov.id !== movie.id);
      },
      error => {
        console.log(error)
      }
    )
  }

  movieCreated(movie: Movie) {
    this.movies.push(movie)
    this.editedMovie = null;
    this.selectedMovie = movie;
  }

  movieUpdated(movie: Movie) {
    const index = this.movies.findIndex(mov => mov.id === movie.id)
    if (index >= 0) {
      this.movies[index] = movie;
    }
    this.editedMovie = null;
    this.selectedMovie = movie;
  }
}
