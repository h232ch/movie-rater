import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Movie} from "../../models/Movie";
import { FormGroup, FormControl } from "@angular/forms";
import { ApiService } from "../../api.service";

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent {

  movieForm: any;
  id: number | null= null;
  @Output() movieCreated = new EventEmitter<any>();
  @Output() movieUpdated = new EventEmitter<any>();

  @Input() set movie(val: Movie) {
    this.id = val.id;
    console.log(this.id);
    this.movieForm = new FormGroup({
      title: new FormControl(val.title),
      description: new FormControl(val.description),
    });
  }

  constructor(private apiService: ApiService) {
  }

  saveForm() {
    if (this.id) {
      this.apiService.updateMovie(
        this.id,
        this.movieForm.value.title,
        this.movieForm.value.description).subscribe(
        result => {
          this.movieUpdated.emit(result)
          console.log(result);
        },
        error => console.log(error)
      );

    } else {
      this.apiService.createMovie(
      this.movieForm.value.title,
      this.movieForm.value.description).subscribe(
        (result) => {
        this.movieCreated.emit(result)
      },
      error => console.log(error),
    );

    }

  }

  formDisabled() {
    if (this.movieForm.value.title.length &&
      this.movieForm.value.description.length) {
      return false;
    } else {
      return true;
    }
  }
}
