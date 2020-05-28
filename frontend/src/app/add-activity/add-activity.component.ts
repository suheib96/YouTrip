import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../activity.service';
import { Activity } from '../Activity/activity';
import { City } from '../city';
import { CityService } from '../city.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})

export class AddActivityComponent implements OnInit {

  activities: Activity[];
  cities: City[];
  wasFailure: boolean = false;
  form: FormGroup;

  constructor(private citiesService: CityService,
              private activitiesService: ActivityService,
              private location: Location,
              private router:Router) {
  }

  ngOnInit() {
    this.activitiesService.findAllActivities().subscribe(activitiesFromBackend => {
      this.activities = activitiesFromBackend;
    });

    this.citiesService.findAllCities().subscribe(citiesFromBackend => {
      this.cities = citiesFromBackend;
    });
  }

  handleFormSubmit(activity:Activity){
    this.activitiesService.addActivity(activity).subscribe(newActivityCreated => this.router.navigate(['activities']));
    this.handleCancel();
  }

  handleCancel() {
    this.location.back();
  }
}
