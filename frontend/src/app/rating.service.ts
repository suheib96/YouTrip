import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Rating } from './main/Rating/rating';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'

const baseUrl = "http://localhost:8080/ratings"

@Injectable({
  providedIn: 'root'
})

export class RatingService {

  readonly change$ = new Subject<void>();
  
  constructor(private http: HttpClient ) { }
  
  public findAllRatings(): Observable<Rating[]> {
    return this.http.get<Rating[]>(baseUrl);
  }

  public findListOfRatingsByActivityID(id: number): Observable<Rating[]>{
    return this.http.get<Rating[]>(baseUrl + '?activityId=' + id);
  }

  public addRating(rating: Rating): Observable<Rating> {
    return this.http.post<Rating>(baseUrl, rating).pipe(tap(() => this.change$.next()));
  }

  public deleteByRating(id: number): Observable<void> {
    return this.http.delete<void>(baseUrl + '/' + id).pipe(tap(() => this.change$.next()));
  }

  public updateRatingById(id: number, rating: Rating): Observable<void> {
    return this.http.put<void>(baseUrl + '/' + id, rating).pipe(tap(() => this.change$.next()));
  }

}

