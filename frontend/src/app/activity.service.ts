import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, } from 'rxjs';
import { Activity } from './Activity/activity';
import { tap} from 'rxjs/operators';

const baseUrl = 'http://localhost:8080/activities'

@Injectable({
  providedIn: 'root'
})

export class ActivityService {

  readonly change$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  public addActivity(activity: Activity): Observable<Activity> {
    return this.http.post<Activity>(baseUrl, activity).pipe(tap(() => this.change$.next()));
  }

  public findAllActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(baseUrl);
  }

  public findAllActivitiesInCity(id: number): Observable<Activity[]> {
    return this.http.get<Activity[]>(baseUrl + '?cityId=' + id).pipe(tap(() => this.change$.next()));
  }

  public findAllActivitiesByActivityCategory(category: string): Observable<Activity[]> {
    return this.http.get<Activity[]>(baseUrl + '?category=' + category);
  }

  public findAllActivitiesByCityAndActivityCategory(cityId: number, category: string): Observable<Activity[]> {
    return this.http.get<Activity[]>(baseUrl + '?cityId=' + cityId + '&category=' + category);
  }

  public findAllActivitiesByAverageRatingScore(score: number): Observable<Activity[]> {
    return this.http.get<Activity[]>(baseUrl + '?score=' + score);
  }

  public findAllActivitiesByCityAndAverageRatingScore(cityId: number, score: number): Observable<Activity[]> {
    return this.http.get<Activity[]>(baseUrl + '?cityId=' + cityId + '&score=' + score);
  }
  
  public findOneActivityById(activityId:number): Observable<Activity>{
    return this.http.get<Activity>(baseUrl + '/' + activityId);
  }

  public deleteOneActivityById (activityId: number): Observable<void> {
    return this.http.delete<void>(baseUrl + '/' + activityId).pipe(tap(() => this.change$.next()));
  }
  
  public editOneAcitivityById (activityId:number, activity:Activity): Observable<Activity>{
    return this.http.put<Activity>(baseUrl + '/' + activityId, activity).pipe(tap(()=> this.change$.next()));
  }


}
