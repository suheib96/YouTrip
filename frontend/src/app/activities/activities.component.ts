import { Component, OnInit } from '@angular/core';
import { Activity } from '../Activity/activity';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {

  activities: Activity[] = [];
  cityId: number;
  category: string;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {

    this.route.queryParamMap.subscribe(paramMap => {
      this.cityId = +paramMap.get('city');
      this.category = paramMap.get('category');
    });

  }

  handleReceiveActivities(activities: Activity[]) {
    this.activities = activities;
  }

}
