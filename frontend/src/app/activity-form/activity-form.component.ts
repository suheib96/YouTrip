import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Activity } from '../Activity/activity';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivityService } from '../activity.service';
import { CityService } from '../city.service';
import { City } from '../city';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.css']
})

export class ActivityFormComponent implements OnInit {

  @Output()
  activityOut = new EventEmitter<Activity>();

  @Input()
  activityIn: Activity;

  activityId: number;
  form: FormGroup;
  cities: City[];

  constructor(
    private fb: FormBuilder,
    private citiesService: CityService
  ) { }

  ngOnInit() {
    this.citiesService.findAllCities().subscribe(citiesFromBackend => {
      this.cities = citiesFromBackend;
    });
    
    this.fillActivityForm();
    
  }

  handleSubmit() {
    if (this.form.valid) {
      let activity: Activity = {
        city: {
          id: this.form.value.city
        },
        name: this.form.value.name,
        street: this.form.value.street,
        houseNumber: this.form.value.houseNumber,
        zipCode: this.form.value.zipCode,
        activityCategory: this.form.value.activityCategory,
        description: this.form.value.description,
        contactDetails: {
          website: this.form.value.website,
          emailAddress: this.form.value.emailAddress,
          phoneNumber: this.form.value.phoneNumber
        }
      };
      this.activityOut.emit(activity)
    } else {
      alert("Fehlerhafte Eingabe");
    }
  }

  private fillActivityForm(){
    if (this.activityIn) {
      this.form = this.fb.group({
        name: [this.activityIn.name, [Validators.required, Validators.minLength(1)]],
        activityCategory: [this.activityIn.activityCategory, [Validators.required]],
        street: [this.activityIn.street, [Validators.required, Validators.minLength(1)]],
        houseNumber: [this.activityIn.houseNumber, [Validators.required, Validators.minLength(1)]],
        zipCode: [this.activityIn.zipCode, [Validators.required, Validators.min(1000), Validators.max(99999)]],
        city: [this.activityIn.city.id, [Validators.required]],
        description: [this.activityIn.description],
        website: [this.activityIn.contactDetails.website],
        emailAddress: [this.activityIn.contactDetails.emailAddress],
        phoneNumber: [this.activityIn.contactDetails.phoneNumber]
      })
    } else {
      this.form = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(1)]],
        activityCategory: ['', [Validators.required]],
        street: ['', [Validators.required, Validators.minLength(1)]],
        houseNumber: ['', [Validators.required, Validators.minLength(1)]],
        zipCode: ['', [Validators.required, Validators.min(1000), Validators.max(99999)]],
        city: ['', [Validators.required]],
        description: [''],
        website: [''],
        emailAddress: [''],
        phoneNumber: ['']
      })
    }
  }

}
