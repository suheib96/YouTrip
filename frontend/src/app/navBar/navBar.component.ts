import { Component, OnInit } from '@angular/core';
import { CityService } from '../city.service';
import { City } from '../city';

@Component({
  selector: 'app-navBar',
  templateUrl: './navBar.component.html',
  styleUrls: ['./navBar.component.css']
})
export class NavBarComponent implements OnInit {

  cities: City[] = []

  constructor(private citiesService: CityService) { }

  ngOnInit() {
    this.citiesService.findAllCities().subscribe(citiesFromBackend => {
      this.cities = citiesFromBackend;
    });
  }

}
