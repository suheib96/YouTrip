import { Component, OnInit } from '@angular/core';
import { CityService } from '../city.service';
import { City } from '../city';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})

export class SearchBarComponent implements OnInit {

  cities: City[] = [];
  citiesSearchResult: Array<any> = [];
  cityName: string = "";
  wantedCity: string;
  wantedCityId: number;
  form: FormGroup;
  city: City;

  constructor(private cityservice: CityService, 
              private fb: FormBuilder,
              private router: Router) {

    this.form = this.fb.group({
      city: ['', [Validators.required]]
    })
  }

  ngOnInit() {

    this.cityservice.findAllCities().subscribe(citiesFromBackend => {
      this.cities = citiesFromBackend;
    })
  }


  findCity() {
    this.citiesSearchResult = this.cities.filter(cityToFilter => cityToFilter.name.toLowerCase()
    .startsWith(this.wantedCity.toLowerCase()));
    if (this.citiesSearchResult.length > 0) {
      let city = this.cities.find(cityToFilter => cityToFilter.name.toLowerCase()
      .startsWith(this.wantedCity.toLowerCase()));
      this.wantedCityId = city.id;
    } else {
      this.wantedCityId = null;
    }
  }
  removeDropDownList() {
    this.citiesSearchResult = [];
  }

  fillAndFind(city) {
    this.wantedCity = city.name; 
    this.findCity();
    this.removeDropDownList();
    this.router.navigate(["/activities"],{queryParams: {city: this.wantedCityId}});
  }
}