import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';;
import { faStar } from "@fortawesome/free-solid-svg-icons";
import {ApiService} from "../../api.service";
import {Movie} from "../../models/Movie";


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit{
  faStar = faStar;


  @Input() movie!: Movie
  @Output() updateMovie = new EventEmitter<Movie>();
  rateHovered = 0;
  constructor(private apiService: ApiService) {
  }
  ngOnInit(): void {

  }

  rateHover(rate: number) {
    this.rateHovered = rate;
    // console.log(rate)
  }

  rateClicked(rate: number) {
    this.apiService.rateMovie(rate, this.movie.id).subscribe(
      result => {
        this.getDetails(); // refresh movie data
        // console.log(result)
      },
      error => console.log(error)
    );
  }

  // Binding Process (Two way binding)
  // Detail Template "rateClicked" -> Detail Comp "getDetails" -> API Serv "getMovie(this.movie.id) ->
  // Detail Comp "this.updateMovie.emit(movie) -> Main Template "selectMovie(movie.id)" ->
  // Main Comp "selectedMovie = movie" -> Main Template "[movie]="selectedMovie" ->
  // Detail Comp "movie = `changed movie from getDetails function`
  getDetails() {
    this.apiService.getMovie(this.movie.id).subscribe(
      (movie: Movie) => {
        this.updateMovie.emit(movie);
        // console.log(movie);
      },
      error => console.log(error)
    );
  }
}
