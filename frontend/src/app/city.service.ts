import { Injectable } from '@angular/core';
import { City } from './city';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators'

const baseUrl = 'http://localhost:8080/cities';

@Injectable({
  providedIn: 'root'
})

export class CityService {

  readonly change$ = new Subject<void>();

  cityName:string;
  
  constructor(private http: HttpClient) { }

  public findCity(cityName): Observable<City[]>{
    return this.http.get<City[]>(baseUrl + "?name=" + cityName);
  }

  public findCityById(id: number): Observable<City> {
    return this.http.get<City>(baseUrl + '/' + id).pipe(tap(() => this.change$.next()));
  }

  public findAllCities(): Observable<City[]>{
    return this.http.get<City[]>(baseUrl);
  }

  public deleteCityById(id: number): Observable<void>{
    return this.http.delete<void>(baseUrl + '/' + id).pipe(tap(() => this.change$.next()));
  }

  public addCity(city: City): Observable<City> {
    return this.http.post<City>(baseUrl, city).pipe(tap(() => this.change$.next()));
  }

  public updateCity(id: number, city: City): Observable<void>{
    return this.http.put<void>(baseUrl + '/' + id, city).pipe(tap(() => this.change$.next()));
  }
  
}
