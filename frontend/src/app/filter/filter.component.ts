import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { Activity } from '../Activity/activity';
import { City } from '../city';
import { ActivityService } from '../activity.service';
import { CityService } from '../city.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})

export class FilterComponent implements OnInit, OnChanges {

  activities: Activity[] = [];
  cities: City[] = [];
  cityId: number;
  score: number;
  activityToCityById: number;
  formCityAndScore: FormGroup;
  formCityAndCategory: FormGroup;

  @Output() activitiesOut = new EventEmitter<Activity[]>();
  @Input() inputCityId = 0;
  @Input() inputCategory = "";

  constructor(private citiesService: CityService, 
              private activitiesService: ActivityService, 
              private fb: FormBuilder) { 
  } 

  ngOnChanges(params) {
    
    for (const proParam in params) {
      if (params.hasOwnProperty(proParam)) {
        switch (proParam) {
          case 'inputCityId': {
            if(this.inputCityId === 0 && this.inputCategory === null) {
              this.getAllActivities();
            } else {
               this.getAllActivitiesInCity(this.inputCityId);
            }
          }
          case 'inputCategory': {
            if (this.inputCategory !== null) {
              this.getAllActivitiesByCategory(this.inputCategory);
            }
          }
        }
      }
    }
  }

  ngOnInit() {
    this.citiesService.findAllCities().subscribe(citiesFromBackend => {
      this.cities = citiesFromBackend;
    });

    this.activitiesService.change$.subscribe(() => {
      this.activitiesService.findAllActivities().subscribe(activitiesFromBackend => {
        this.activities = activitiesFromBackend;
      })
    });

    this.formCityAndScore = this.fb.group({
      cityId: [''],
      score: ['']
    })

    this.formCityAndCategory = this.fb.group({
      cityId: [''],
      category: ['']
    })
  }

  getAllActivities() {
    this.activitiesService.findAllActivities()
      .subscribe(activitiesFromBackend => this.parentUpdate(activitiesFromBackend));
  }

  getAllActivitiesInCity(cityId: number) {
    this.activitiesService.findAllActivitiesInCity(cityId)
      .subscribe(activitiesFromBackend => this.parentUpdate(activitiesFromBackend));
  }

  getAllActivitiesByCategory(inputCategory: string) {
    this.activitiesService.findAllActivitiesByActivityCategory(inputCategory.toUpperCase())
      .subscribe(activitiesFromBackend => this.parentUpdate(activitiesFromBackend));
  }

  findByCityAndScore() {
    if (this.formCityAndScore.valid) {
      this.getAllActivitiesByCityAndAverageRatingScore(this.formCityAndScore.value.cityId, this.formCityAndScore.value.score)
    }
  }

  getAllActivitiesByCityAndAverageRatingScore(cityId: number, score: number) {
    this.activitiesService.findAllActivitiesByCityAndAverageRatingScore(cityId, score)
      .subscribe(activitiesFromBackend => this.parentUpdate(activitiesFromBackend));
  }
  
  findByCityAndCategory(){
    if (this.formCityAndCategory.valid){
      this.getAllActivitiesByCityAndActivityCategory(this.formCityAndCategory.value.cityId, this.formCityAndCategory.value.category)
    }
  }

  getAllActivitiesByCityAndActivityCategory(cityId: number, category: string){
    this.activitiesService.findAllActivitiesByCityAndActivityCategory(cityId, category)
    .subscribe(activitiesFromBackend => this.parentUpdate(activitiesFromBackend));
  }

  parentUpdate(activitiesFromBackend) {
    this.activitiesOut.emit(activitiesFromBackend);
    return activitiesFromBackend;
  }
}
