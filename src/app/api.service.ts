import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Movie} from "./models/Movie";
import {CookieService} from "ngx-cookie-service";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:8000/'
  baseMovieUrl = `${this.baseUrl}api/movies/`
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });


  private movies = ['terminator', 'predator']
  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
  ) { }

  getMovies() {
    // observable working (http is working with observable)
    return this.httpClient.get<Movie[]>(this.baseMovieUrl, {headers: this.getAuthHeaders()});
  }

  getMovie(id: number) {
    // observable working (http is working with observable)
    return this.httpClient.get<Movie>(`${this.baseMovieUrl}${id}/`, {headers: this.getAuthHeaders()});
  }

  createMovie(title: string, description: string) {
    const body = JSON.stringify({title: title, description: description});
    return this.httpClient.post(`${this.baseMovieUrl}`, body, {headers: this.getAuthHeaders()});
  }

  updateMovie(id: number, title: string, description: string) {
    const body = JSON.stringify({title: title, description: description});
    return this.httpClient.put(`${this.baseMovieUrl}${id}/`, body, {headers: this.getAuthHeaders()});
  }

  deleteMovie(id: number) {
    return this.httpClient.delete(`${this.baseMovieUrl}${id}/`, {headers: this.getAuthHeaders()});
  }

  rateMovie(rate: number, movieId: number) {
    // observable working (http is working with observable)
    const body = JSON.stringify({stars: rate});
    return this.httpClient.post(`${this.baseMovieUrl}${movieId}/rate_movie/`,
      body,{headers: this.getAuthHeaders()});
  }

  loginUser(authData: any) {
    const body = JSON.stringify({username: authData.username, password: authData.password});
    return this.httpClient.post(`${this.baseUrl}auth/`, body, {headers: this.getAuthHeaders()});
  }

  registerUser(authData: any) {
    const body = JSON.stringify({username: authData.username, password: authData.password});
    return this.httpClient.post(`${this.baseUrl}api/users/`, body, {headers: this.getAuthHeaders()});
  }

  // Cookie set
  getAuthHeaders() {
    const token = this.cookieService.get("mr-token")
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`,
    });
  }


}
