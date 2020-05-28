import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivityService } from '../activity.service';
import { Activity } from '../Activity/activity';
import { RatingService } from '../rating.service';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { City } from '../city';
import { CityService } from '../city.service';

@Component({
  selector: 'app-activity-detail-page',
  templateUrl: './activity-detail-page.component.html',
  styleUrls: ['./activity-detail-page.component.css']
})

export class ActivityDetailPageComponent implements OnInit {

  @Output() public updateActivities = new EventEmitter();

  public showAdminFunction = false;

  activityId: number;
  activity: Activity;
  form: FormGroup;
  showEdit = false;
  cities: City[];
  buttonText: string = "Bearbeiten";

  constructor(private route: ActivatedRoute,
    private activityService: ActivityService,
    private cityService:CityService,
    private ratingsService: RatingService,
    private location: Location) {  }

  ngOnInit() {
    this.findAllCities();
    
    this.route.paramMap.subscribe(paramMap => this.activityId = +paramMap.get('id'));
    
    this.findOneActivity();

    this.ratingsService.change$.subscribe(() => {
      this.activityService.findOneActivityById(this.activityId)
        .subscribe(activityFromBackend => this.activity = activityFromBackend);
    }) 
  }

  findOneActivity() {
    this.activityService.findOneActivityById(this.activityId)
      .subscribe(activityFromBackend => this.activity = activityFromBackend);
  }

  findAllCities() {
    this.cityService.findAllCities().subscribe(citiesFromBackend => this.cities = citiesFromBackend);
  }

  handleBackButton() {
    this.location.back();
  }

  handleDeleteActivity(activityId) {
    if (this.activity.listOfRatings.length === 0) {
      this.activityService.deleteOneActivityById(activityId).subscribe();
      this.handleBackButton();
    } else {
      alert("Bewertungen müssen vorher gelöscht werden!")
    }
  }

  handleFormSubmit(activity:Activity) {
    this.activityService.editOneAcitivityById(this.activityId,activity).subscribe();
    this.findOneActivity();
    this.showEdit=false;
    this.buttonText="Bearbeiten";
  }

  showEditField() {
    if (this.showEdit){
      this.buttonText="Bearbeiten"
      this.showEdit = false;
    } else {
      this.buttonText="Abbrechen"
      this.showEdit=true;
    }
  }

  showAdmin() {
    if (this.showAdminFunction) {
      this.showAdminFunction = false;
    } else {
      this.showAdminFunction=true;
    }
  }
}
