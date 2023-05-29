import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:8000/api/movies/'
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Token d49ce13e829dd54ce5d80f80ef72b80b229801aa',
  });
  private movies = ['terminator', 'predator']
  constructor(
    private httpClient: HttpClient,
  ) { }

  getMovies() {
    // observable working (http is working with observable)
    return this.httpClient.get(this.baseUrl, {headers: this.headers});
  }

  rateMovie(rate: number, movieId: number) {
    // observable working (http is working with observable)
    const body = JSON.stringify({stars: rate});
    return this.httpClient.post(`${this.baseUrl}${movieId}/rate_movie/`, body,{headers: this.headers});
  }
}
