import { Component, OnInit } from '@angular/core';
import { City } from '../city';
import { CityService } from '../city.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivityService } from '../activity.service';
import { Activity } from '../Activity/activity';

@Component({
  selector: 'app-city-admin',
  templateUrl: './city-admin.component.html',
  styleUrls: ['./city-admin.component.css']
})

export class CityAdminComponent implements OnInit {
  form: FormGroup;
  cities: City[];
  city: City;
  activities: Activity[] = [];

  constructor(
        private cityService: CityService,
        private activityService: ActivityService,
        private location: Location,
        private fb: FormBuilder) {     
  }

  ngOnInit() {
    this.loadAllCities();

    this.cityService.change$.subscribe(() => {
      this.cityService.findAllCities().subscribe(citiesFromBackEnd => this.cities = citiesFromBackEnd)
    });

    this.form = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  loadAllCities() {
    this.cityService.findAllCities().subscribe(citiesFromBackEnd => this.cities = citiesFromBackEnd);
  }

  findOneCity(id: number) {
    this.cityService.findCityById(id).subscribe(CityFromBackEnd => this.city = CityFromBackEnd);
  }

  findAllActivitiesInCity$(id: number) {
    return this.activityService.findAllActivitiesInCity(id);
  }

  handleDeleteCity(cityId: number) {
    this.activities = [];
    console.log(this.activities)
    this.findAllActivitiesInCity$(cityId).subscribe(data => {
      this.activities = data;
      if (this.activities.length === 0) {
        this.cityService.deleteCityById(cityId).subscribe(() => this.loadAllCities);
      } else {
          alert("Die Aktivitäten der Stadt müssen vorher gelöscht werden!");
      }
    });
  }

  handleBackButton() {
    this.location.back();
  }

  editCity(id: number) {
    if (this.form.valid) {
      let city: City = {
        id: id,
        name: this.form.value.name
      }
      this.cityService.updateCity(id, city).subscribe(() => this.loadAllCities);
    } else {
        alert("Eingabe ungültig, bitte überprüfe nochmal die Eingabe");
    }
    this.form.reset();
  }

  createNewCity() {
    if (this.form.valid) {
      let city: City = {
        name: this.form.value.name
      }
      this.cityService.addCity(city).subscribe(newAddedCity => {
        this.cities.push(newAddedCity)
      });
    } else {
        alert("Eingabe ungültig");
    }
    this.form.reset();
  }

}
