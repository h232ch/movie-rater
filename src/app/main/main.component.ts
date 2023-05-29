import {Component, OnInit} from '@angular/core';
import {ApiService} from "../api.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{

  movies: any = [];
  selectedMovie: any;
  constructor(private apiService: ApiService) {
  }
  ngOnInit(): void {
    this.apiService.getMovies().subscribe(
      data => {
        // @ts-ignore
        this.movies = data;
      },
      error => console.log(error)
    );
  }

  selectMovie(movie: any) {
    this.selectedMovie = movie
    // console.log(this.selectedMovie)
  }
}