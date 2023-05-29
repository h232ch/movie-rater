import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit{

  @Input() movies = <any>[];
  @Output() selectMovie = new EventEmitter();

  constructor() {}
  ngOnInit(): void {

  }
  movieClicked(movie: number) {
    this.selectMovie.emit(movie)
  }
}
