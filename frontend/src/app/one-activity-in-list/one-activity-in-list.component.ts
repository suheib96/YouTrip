import { Component, OnInit, Input } from '@angular/core';
import { ActivityService } from '../activity.service';

@Component({
  selector: 'app-one-activity-in-list',
  templateUrl: './one-activity-in-list.component.html',
  styleUrls: ['./one-activity-in-list.component.css']
})

export class OneActivityInListComponent implements OnInit {

  @Input() inputOneActivity;

  constructor(private activityService: ActivityService) {

   }

  ngOnInit() {
  }

  
}
